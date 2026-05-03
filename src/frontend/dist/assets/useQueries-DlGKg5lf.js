const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CL8mI724.js","assets/index-Bl6m0gAG.js","assets/index-CEwIAGj4.css"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { M as Subscribable, Q as shallowEqualObjects, W as hashKey, Y as getDefaultState, Z as notifyManager, _ as useQueryClient, r as reactExports, $ as noop, a0 as shouldThrowError, a1 as __vitePreload } from "./index-Bl6m0gAG.js";
import { U as UserRole, c as createActor } from "./backend-DBy7dtNU.js";
import "./types-DGUL2UgN.js";
import { u as useActor, a as useQuery } from "./useActor-Bw0dW3YB.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
const _now = BigInt(Date.now()) * BigInt(1e6);
function _makePrincipal(id) {
  return { toText: () => id };
}
const STATIC_WORKERS = [
  {
    id: _makePrincipal("worker-hira-singh"),
    name: "Hira Singh",
    phone: "+91 80917 72338",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(8),
    averageRating: 4.8,
    completedJobsCount: BigInt(95),
    skills: ["Pipe Fitting", "Leak Repair", "Installation"]
  },
  {
    id: _makePrincipal("worker-chintu"),
    name: "Chintu",
    phone: "+91 78762 51663",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(5),
    averageRating: 4.5,
    completedJobsCount: BigInt(67),
    skills: ["Pipe Fitting", "Drainage", "Repair"]
  },
  {
    id: _makePrincipal("worker-lucky"),
    name: "Lucky",
    phone: "+91 82196 96946",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(120),
    skills: ["Furniture Making", "Wood Work", "Repair"]
  },
  {
    id: _makePrincipal("worker-raju-mistri"),
    name: "Raju Mistri",
    phone: "+91 98765 43210",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(10),
    averageRating: 4.7,
    completedJobsCount: BigInt(43),
    skills: ["Masonry", "Construction", "Repair"]
  },
  {
    id: _makePrincipal("worker-suresh-painter"),
    name: "Suresh Painter",
    phone: "+91 97654 32109",
    location: "Mumbai",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(7),
    averageRating: 4.6,
    completedJobsCount: BigInt(82),
    skills: ["Interior Painting", "Exterior Painting", "Wall Finishing"]
  },
  {
    id: _makePrincipal("worker-mohan-kumar"),
    name: "Mohan Kumar",
    phone: "+91 96543 21098",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(4),
    averageRating: 4.3,
    completedJobsCount: BigInt(38),
    skills: ["Painting", "Whitewash", "Texture Work"]
  },
  {
    id: _makePrincipal("worker-arvind-electrician"),
    name: "Arvind Electrician",
    phone: "+91 95432 10987",
    location: "Noida",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(9),
    averageRating: 4.7,
    completedJobsCount: BigInt(55),
    skills: ["Wiring", "Panel Installation", "Repairs"]
  }
];
const STATIC_MAIDS = [
  {
    id: _makePrincipal("maid-sunita-devi"),
    name: "Sunita Devi",
    phone: "+91 91234 56789",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(5),
    averageRating: 4.7,
    completedJobsCount: BigInt(130),
    skills: ["House Cleaning", "Cooking", "Kitchen Cleaning"],
    maidCategory: "houseCleaner"
  },
  {
    id: _makePrincipal("maid-pooja-sharma"),
    name: "Pooja Sharma",
    phone: "+91 92345 67890",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(3),
    averageRating: 4.9,
    completedJobsCount: BigInt(60),
    skills: ["Babysitting", "Child Care", "Homework Help"],
    maidCategory: "babysitter"
  },
  {
    id: _makePrincipal("maid-meena-kumari"),
    name: "Meena Kumari",
    phone: "+91 93456 78901",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(180),
    skills: ["Full-time Maid", "House Cleaning", "Cooking", "Laundry"],
    maidCategory: "maidServices"
  },
  {
    id: _makePrincipal("maid-rekha-thakur"),
    name: "Rekha Thakur",
    phone: "+91 94567 89012",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(4),
    averageRating: 4.6,
    completedJobsCount: BigInt(85),
    skills: ["Childcare", "House Cleaning", "Infant Care"],
    maidCategory: "childcare"
  }
];
function useListWorkers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["workers"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const live = await actor.listWorkers();
          if (live && live.length > 0) return live;
        } catch {
        }
      }
      return STATIC_WORKERS;
    },
    // Always enabled — initialData ensures immediate render without loading flash
    enabled: true,
    initialData: STATIC_WORKERS
  });
}
function useListMaids() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["maids"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const live = await actor.listMaids();
          if (live && live.length > 0) return live;
        } catch {
        }
      }
      return STATIC_MAIDS;
    },
    enabled: true,
    initialData: STATIC_MAIDS
  });
}
function usePlatformStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor)
        return { totalJobs: 0n, totalWorkers: 0n, totalCompletedJobs: 0n };
      return actor.getPlatformStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useListJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs();
    },
    enabled: !!actor && !isFetching
  });
}
function useFilterJobs(location, workType, maxBudget) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["jobs", "filter", location, workType, maxBudget == null ? void 0 : maxBudget.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.filterJobs(location, workType, maxBudget);
    },
    enabled: !!actor && !isFetching
  });
}
function useGetJob(jobId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["job", jobId == null ? void 0 : jobId.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return null;
      return actor.getJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId
  });
}
function useGetMyPostedJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPostedJobs();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetCallerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetUserProfile(userId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-CL8mI724.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.getUserProfile(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId
  });
}
function useGetMessagesForJob(jobId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["messages", jobId == null ? void 0 : jobId.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return [];
      return actor.getMessagesForJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
    refetchInterval: 1e4
  });
}
function useGetMyNotifications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyNotifications();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useGetPaymentsForJob(jobId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payments", jobId == null ? void 0 : jobId.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return [];
      return actor.getPaymentsForJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId
  });
}
function useSendMessage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      jobId,
      content
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendMessage(jobId, content);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["messages", vars.jobId.toString()] });
    }
  });
}
function useCreateReview() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      revieweePrincipal,
      jobId,
      rating,
      comment
    }) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-CL8mI724.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.createReview(
        Principal.fromText(revieweePrincipal),
        jobId,
        rating,
        comment
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["jobReviews", vars.jobId.toString()] });
    }
  });
}
function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId) => {
      if (!actor) throw new Error("Not connected");
      return actor.markNotificationRead(notificationId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
}
function useMarkAllNotificationsRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.markAllNotificationsRead();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
}
function useSaveCallerUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    }
  });
}
export {
  useListJobs as a,
  useFilterJobs as b,
  useGetJob as c,
  useGetMessagesForJob as d,
  useGetPaymentsForJob as e,
  useGetCallerProfile as f,
  useSendMessage as g,
  useGetUserProfile as h,
  usePlatformStats as i,
  useListWorkers as j,
  useListMaids as k,
  useGetMyPostedJobs as l,
  useGetMyNotifications as m,
  useMarkNotificationRead as n,
  useMarkAllNotificationsRead as o,
  useSaveCallerUserProfile as p,
  useCreateReview as u
};
