import { aa as ProtocolError, ab as TimeoutWaitingForResponseErrorCode, ac as utf8ToBytes, ad as ExternalError, ae as MissingRootKeyErrorCode, af as Certificate, ag as lookupResultToBuffer, ah as RequestStatusResponseStatus, ai as UnknownError, aj as RequestStatusDoneNoReplyErrorCode, ak as RejectError, al as CertifiedRejectErrorCode, am as UNREACHABLE_ERROR, an as InputError, ao as InvalidReadStateRequestErrorCode, ap as ReadRequestType, o as Principal, aq as IDL, ar as MissingCanisterIdErrorCode, as as HttpAgent, at as encode, au as QueryResponseStatus, av as UncertifiedRejectErrorCode, aw as isV3ResponseBody, ax as isV2ResponseBody, ay as UncertifiedRejectUpdateErrorCode, az as UnexpectedErrorCode, aA as decode } from "./index-Bl6m0gAG.js";
import { i as idlFactory } from "./types-DGUL2UgN.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a = agent.createReadStateRequest) == null ? void 0 : _a.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var JobStatus = /* @__PURE__ */ ((JobStatus2) => {
  JobStatus2["assigned"] = "assigned";
  JobStatus2["cancelled"] = "cancelled";
  JobStatus2["open"] = "open";
  JobStatus2["completed"] = "completed";
  return JobStatus2;
})(JobStatus || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["pending"] = "pending";
  PaymentStatus2["paid"] = "paid";
  return PaymentStatus2;
})(PaymentStatus || {});
var PaymentType = /* @__PURE__ */ ((PaymentType2) => {
  PaymentType2["completion"] = "completion";
  PaymentType2["deposit"] = "deposit";
  return PaymentType2;
})(PaymentType || {});
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["laborer"] = "laborer";
  UserRole2["maid"] = "maid";
  UserRole2["homeowner"] = "homeowner";
  return UserRole2;
})(UserRole || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _immutableObjectStorageBlobsAreLive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
      return result;
    }
  }
  async _immutableObjectStorageBlobsToDelete() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsToDelete();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsToDelete();
      return result;
    }
  }
  async _immutableObjectStorageConfirmBlobDeletion(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
      return result;
    }
  }
  async _immutableObjectStorageCreateCertificate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
      return result;
    }
  }
  async _immutableObjectStorageRefillCashier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
        return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
      return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async _immutableObjectStorageUpdateGatewayPrincipals() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
      return result;
    }
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole__1_n8(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole__1_n8(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async assignWorker(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignWorker(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignWorker(arg0, arg1);
      return result;
    }
  }
  async cancelJob(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.cancelJob(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.cancelJob(arg0);
      return result;
    }
  }
  async completeJob(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.completeJob(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.completeJob(arg0);
      return result;
    }
  }
  async confirmPayment(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.confirmPayment(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.confirmPayment(arg0);
      return result;
    }
  }
  async createCheckoutSession(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createCheckoutSession(arg0, arg1, arg2);
      return result;
    }
  }
  async createReview(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.createReview(arg0, arg1, arg2, arg3);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createReview(arg0, arg1, arg2, arg3);
      return result;
    }
  }
  async createUserProfile(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.createUserProfile(arg0, arg1, arg2, to_candid_UserRole_n10(this._uploadFile, this._downloadFile, arg3));
        return from_candid_UserProfile_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createUserProfile(arg0, arg1, arg2, to_candid_UserRole_n10(this._uploadFile, this._downloadFile, arg3));
      return from_candid_UserProfile_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async filterJobs(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.filterJobs(to_candid_opt_n19(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n20(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n23(this._uploadFile, this._downloadFile, arg2));
        return from_candid_vec_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.filterJobs(to_candid_opt_n19(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n20(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n23(this._uploadFile, this._downloadFile, arg2));
      return from_candid_vec_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserProfile();
        return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserProfile();
      return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole__1_n35(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole__1_n35(this._uploadFile, this._downloadFile, result);
    }
  }
  async getJob(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getJob(arg0);
        return from_candid_opt_n37(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getJob(arg0);
      return from_candid_opt_n37(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMessagesForJob(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getMessagesForJob(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMessagesForJob(arg0);
      return result;
    }
  }
  async getMyNotifications() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyNotifications();
        return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyNotifications();
      return from_candid_vec_n38(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyPostedJobs() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyPostedJobs();
        return from_candid_vec_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyPostedJobs();
      return from_candid_vec_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPaymentsForJob(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getPaymentsForJob(arg0);
        return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPaymentsForJob(arg0);
      return from_candid_vec_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPlatformStats() {
    if (this.processError) {
      try {
        const result = await this.actor.getPlatformStats();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPlatformStats();
      return result;
    }
  }
  async getReviewsForJob(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getReviewsForJob(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getReviewsForJob(arg0);
      return result;
    }
  }
  async getReviewsForUser(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getReviewsForUser(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getReviewsForUser(arg0);
      return result;
    }
  }
  async getStripeSessionStatus(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getStripeSessionStatus(arg0);
        return from_candid_StripeSessionStatus_n49(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStripeSessionStatus(arg0);
      return from_candid_StripeSessionStatus_n49(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserProfile(arg0);
        return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserProfile(arg0);
      return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async isStripeConfigured() {
    if (this.processError) {
      try {
        const result = await this.actor.isStripeConfigured();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isStripeConfigured();
      return result;
    }
  }
  async listJobs() {
    if (this.processError) {
      try {
        const result = await this.actor.listJobs();
        return from_candid_vec_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listJobs();
      return from_candid_vec_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async listMaids() {
    if (this.processError) {
      try {
        const result = await this.actor.listMaids();
        return from_candid_vec_n52(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listMaids();
      return from_candid_vec_n52(this._uploadFile, this._downloadFile, result);
    }
  }
  async listWorkers() {
    if (this.processError) {
      try {
        const result = await this.actor.listWorkers();
        return from_candid_vec_n52(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listWorkers();
      return from_candid_vec_n52(this._uploadFile, this._downloadFile, result);
    }
  }
  async markAllNotificationsRead() {
    if (this.processError) {
      try {
        const result = await this.actor.markAllNotificationsRead();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.markAllNotificationsRead();
      return result;
    }
  }
  async markNotificationRead(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.markNotificationRead(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.markNotificationRead(arg0);
      return result;
    }
  }
  async postJob(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    if (this.processError) {
      try {
        const result = await this.actor.postJob(arg0, arg1, to_candid_WorkType_n21(this._uploadFile, this._downloadFile, arg2), arg3, arg4, arg5, to_candid_opt_n19(this._uploadFile, this._downloadFile, arg6), await to_candid_vec_n53(this._uploadFile, this._downloadFile, arg7));
        return from_candid_Job_n25(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.postJob(arg0, arg1, to_candid_WorkType_n21(this._uploadFile, this._downloadFile, arg2), arg3, arg4, arg5, to_candid_opt_n19(this._uploadFile, this._downloadFile, arg6), await to_candid_vec_n53(this._uploadFile, this._downloadFile, arg7));
      return from_candid_Job_n25(this._uploadFile, this._downloadFile, result);
    }
  }
  async recordPayment(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.recordPayment(arg0, arg1, to_candid_PaymentType_n55(this._uploadFile, this._downloadFile, arg2), arg3);
        return from_candid_Payment_n43(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.recordPayment(arg0, arg1, to_candid_PaymentType_n55(this._uploadFile, this._downloadFile, arg2), arg3);
      return from_candid_Payment_n43(this._uploadFile, this._downloadFile, result);
    }
  }
  async saveCallerUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveCallerUserProfile(to_candid_UserProfile_n57(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveCallerUserProfile(to_candid_UserProfile_n57(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async sendMessage(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.sendMessage(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendMessage(arg0, arg1);
      return result;
    }
  }
  async setStripeConfiguration(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setStripeConfiguration(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setStripeConfiguration(arg0);
      return result;
    }
  }
  async transform(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.transform(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.transform(arg0);
      return result;
    }
  }
  async updateUserProfile(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.updateUserProfile(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateUserProfile(arg0, arg1, arg2);
      return result;
    }
  }
}
async function from_candid_ExternalBlob_n32(_uploadFile, _downloadFile, value) {
  return await _downloadFile(value);
}
function from_candid_JobStatus_n27(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n28(_uploadFile, _downloadFile, value);
}
async function from_candid_Job_n25(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n26(_uploadFile, _downloadFile, value);
}
function from_candid_Notification_n39(_uploadFile, _downloadFile, value) {
  return from_candid_record_n40(_uploadFile, _downloadFile, value);
}
function from_candid_PaymentStatus_n45(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n46(_uploadFile, _downloadFile, value);
}
function from_candid_PaymentType_n47(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n48(_uploadFile, _downloadFile, value);
}
function from_candid_Payment_n43(_uploadFile, _downloadFile, value) {
  return from_candid_record_n44(_uploadFile, _downloadFile, value);
}
function from_candid_StripeSessionStatus_n49(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n50(_uploadFile, _downloadFile, value);
}
function from_candid_UserProfile_n12(_uploadFile, _downloadFile, value) {
  return from_candid_record_n13(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole__1_n35(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n36(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n14(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n15(_uploadFile, _downloadFile, value);
}
function from_candid_WorkType_n29(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n30(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n16(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n17(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n18(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n33(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n34(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_UserProfile_n12(_uploadFile, _downloadFile, value[0]);
}
async function from_candid_opt_n37(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_Job_n25(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n41(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n13(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    yearsExperience: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.yearsExperience)),
    name: value.name,
    createdAt: value.createdAt,
    role: from_candid_UserRole_n14(_uploadFile, _downloadFile, value.role),
    averageRating: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.averageRating)),
    maidCategory: record_opt_to_undefined(from_candid_opt_n17(_uploadFile, _downloadFile, value.maidCategory)),
    phone: value.phone,
    completedJobsCount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.completedJobsCount)),
    skills: record_opt_to_undefined(from_candid_opt_n18(_uploadFile, _downloadFile, value.skills)),
    location: value.location
  };
}
async function from_candid_record_n26(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_JobStatus_n27(_uploadFile, _downloadFile, value.status),
    workType: from_candid_WorkType_n29(_uploadFile, _downloadFile, value.workType),
    title: value.title,
    imageUrls: await from_candid_vec_n31(_uploadFile, _downloadFile, value.imageUrls),
    timelineDays: value.timelineDays,
    createdAt: value.createdAt,
    assignedWorker: record_opt_to_undefined(from_candid_opt_n33(_uploadFile, _downloadFile, value.assignedWorker)),
    description: value.description,
    requiredMaterials: record_opt_to_undefined(from_candid_opt_n17(_uploadFile, _downloadFile, value.requiredMaterials)),
    budget: value.budget,
    posterPrincipal: value.posterPrincipal,
    location: value.location
  };
}
function from_candid_record_n40(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    createdAt: value.createdAt,
    read: value.read,
    relatedJobId: record_opt_to_undefined(from_candid_opt_n41(_uploadFile, _downloadFile, value.relatedJobId)),
    messageText: value.messageText,
    userPrincipal: value.userPrincipal
  };
}
function from_candid_record_n44(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_PaymentStatus_n45(_uploadFile, _downloadFile, value.status),
    homeownerPrincipal: value.homeownerPrincipal,
    createdAt: value.createdAt,
    jobId: value.jobId,
    amountPaid: value.amountPaid,
    paymentType: from_candid_PaymentType_n47(_uploadFile, _downloadFile, value.paymentType),
    stripeSessionId: value.stripeSessionId
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
    topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
  };
}
function from_candid_record_n51(_uploadFile, _downloadFile, value) {
  return {
    userPrincipal: record_opt_to_undefined(from_candid_opt_n17(_uploadFile, _downloadFile, value.userPrincipal)),
    response: value.response
  };
}
function from_candid_variant_n15(_uploadFile, _downloadFile, value) {
  return "laborer" in value ? "laborer" : "maid" in value ? "maid" : "homeowner" in value ? "homeowner" : value;
}
function from_candid_variant_n28(_uploadFile, _downloadFile, value) {
  return "assigned" in value ? "assigned" : "cancelled" in value ? "cancelled" : "open" in value ? "open" : "completed" in value ? "completed" : value;
}
function from_candid_variant_n30(_uploadFile, _downloadFile, value) {
  return "other" in value ? "other" : "cook" in value ? "cook" : "houseCleaner" in value ? "houseCleaner" : "plumbing" in value ? "plumbing" : "painting" in value ? "painting" : "general" in value ? "general" : "electrical" in value ? "electrical" : "babysitter" in value ? "babysitter" : "maidServices" in value ? "maidServices" : "childcare" in value ? "childcare" : "laundry" in value ? "laundry" : "carpentry" in value ? "carpentry" : "masonry" in value ? "masonry" : value;
}
function from_candid_variant_n36(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n46(_uploadFile, _downloadFile, value) {
  return "pending" in value ? "pending" : "paid" in value ? "paid" : value;
}
function from_candid_variant_n48(_uploadFile, _downloadFile, value) {
  return "completion" in value ? "completion" : "deposit" in value ? "deposit" : value;
}
function from_candid_variant_n50(_uploadFile, _downloadFile, value) {
  return "completed" in value ? {
    __kind__: "completed",
    completed: from_candid_record_n51(_uploadFile, _downloadFile, value.completed)
  } : "failed" in value ? {
    __kind__: "failed",
    failed: value.failed
  } : value;
}
async function from_candid_vec_n24(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Job_n25(_uploadFile, _downloadFile, x)));
}
async function from_candid_vec_n31(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_ExternalBlob_n32(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n38(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Notification_n39(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n42(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Payment_n43(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n52(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_UserProfile_n12(_uploadFile, _downloadFile, x));
}
async function to_candid_ExternalBlob_n54(_uploadFile, _downloadFile, value) {
  return await _uploadFile(value);
}
function to_candid_PaymentType_n55(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n56(_uploadFile, _downloadFile, value);
}
function to_candid_UserProfile_n57(_uploadFile, _downloadFile, value) {
  return to_candid_record_n58(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole__1_n8(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n9(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n10(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n11(_uploadFile, _downloadFile, value);
}
function to_candid_WorkType_n21(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n22(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_opt_n19(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_opt_n20(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid_WorkType_n21(_uploadFile, _downloadFile, value));
}
function to_candid_opt_n23(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
  };
}
function to_candid_record_n58(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    yearsExperience: value.yearsExperience ? candid_some(value.yearsExperience) : candid_none(),
    name: value.name,
    createdAt: value.createdAt,
    role: to_candid_UserRole_n10(_uploadFile, _downloadFile, value.role),
    averageRating: value.averageRating ? candid_some(value.averageRating) : candid_none(),
    maidCategory: value.maidCategory ? candid_some(value.maidCategory) : candid_none(),
    phone: value.phone,
    completedJobsCount: value.completedJobsCount ? candid_some(value.completedJobsCount) : candid_none(),
    skills: value.skills ? candid_some(value.skills) : candid_none(),
    location: value.location
  };
}
function to_candid_variant_n11(_uploadFile, _downloadFile, value) {
  return value == "laborer" ? {
    laborer: null
  } : value == "maid" ? {
    maid: null
  } : value == "homeowner" ? {
    homeowner: null
  } : value;
}
function to_candid_variant_n22(_uploadFile, _downloadFile, value) {
  return value == "other" ? {
    other: null
  } : value == "cook" ? {
    cook: null
  } : value == "houseCleaner" ? {
    houseCleaner: null
  } : value == "plumbing" ? {
    plumbing: null
  } : value == "painting" ? {
    painting: null
  } : value == "general" ? {
    general: null
  } : value == "electrical" ? {
    electrical: null
  } : value == "babysitter" ? {
    babysitter: null
  } : value == "maidServices" ? {
    maidServices: null
  } : value == "childcare" ? {
    childcare: null
  } : value == "laundry" ? {
    laundry: null
  } : value == "carpentry" ? {
    carpentry: null
  } : value == "masonry" ? {
    masonry: null
  } : value;
}
function to_candid_variant_n56(_uploadFile, _downloadFile, value) {
  return value == "completion" ? {
    completion: null
  } : value == "deposit" ? {
    deposit: null
  } : value;
}
function to_candid_variant_n9(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
async function to_candid_vec_n53(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await to_candid_ExternalBlob_n54(_uploadFile, _downloadFile, x)));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  JobStatus as J,
  PaymentType as P,
  UserRole as U,
  PaymentStatus as a,
  createActor as c
};
