import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "types/common";
import UserTypes "types/users";
import JobTypes "types/jobs";
import ReviewTypes "types/reviews";
import MsgTypes "types/messages";
import PaymentTypes "types/payments";
import NotifTypes "types/notifications";
import UsersMixin "mixins/users-api";
import JobsMixin "mixins/jobs-api";
import ReviewsMixin "mixins/reviews-api";
import MessagesMixin "mixins/messages-api";
import PaymentsMixin "mixins/payments-api";
import NotificationsMixin "mixins/notifications-api";



actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (images)
  include MixinObjectStorage();

  // State
  let userProfiles = Map.empty<Principal, UserTypes.UserProfile>();
  let jobs = Map.empty<Nat, JobTypes.Job>();
  let reviews = Map.empty<Nat, ReviewTypes.Review>();
  let messages = Map.empty<Nat, MsgTypes.Message>();
  let payments = Map.empty<Nat, PaymentTypes.Payment>();
  let notifications = Map.empty<Nat, NotifTypes.Notification>();

  // Counters
  let nextJobId = Common.counter();
  let nextReviewId = Common.counter();
  let nextMessageId = Common.counter();
  let nextPaymentId = Common.counter();
  let nextNotifId = Common.counter();

  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Stripe — must be declared directly in actor
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?cfg) { cfg };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Mixins
  include UsersMixin(accessControlState, userProfiles);
  include JobsMixin(accessControlState, userProfiles, jobs, notifications, nextJobId, nextNotifId);
  include ReviewsMixin(accessControlState, userProfiles, jobs, reviews, nextReviewId);
  include MessagesMixin(accessControlState, userProfiles, jobs, messages, notifications, nextMessageId, nextNotifId);
  include PaymentsMixin(accessControlState, userProfiles, jobs, payments, notifications, nextPaymentId, nextNotifId);
  include NotificationsMixin(accessControlState, notifications);
};
