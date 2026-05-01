import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PaymentLib "../lib/payments";
import Common "../types/common";
import UserTypes "../types/users";
import JobTypes "../types/jobs";
import PaymentTypes "../types/payments";
import NotifTypes "../types/notifications";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  jobs : Map.Map<Nat, JobTypes.Job>,
  payments : Map.Map<Nat, PaymentTypes.Payment>,
  notifications : Map.Map<Nat, NotifTypes.Notification>,
  nextPaymentId : Common.Counter,
  nextNotifId : Common.Counter,
) {
  public shared ({ caller }) func recordPayment(
    jobId : Nat,
    amountPaid : Nat,
    paymentType : PaymentTypes.PaymentType,
    stripeSessionId : Text,
  ) : async PaymentTypes.Payment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let job = switch (jobs.get(jobId)) {
      case (?j) { j };
      case null { Runtime.trap("Job not found") };
    };
    if (job.posterPrincipal != caller) {
      Runtime.trap("Unauthorized: Only the homeowner can record payments");
    };
    let payment = PaymentLib.recordPayment(payments, nextPaymentId.value, jobId, caller, amountPaid, paymentType, stripeSessionId);
    nextPaymentId.value += 1;
    payment;
  };

  public shared ({ caller }) func confirmPayment(stripeSessionId : Text) : async () {
    PaymentLib.confirmPayment(payments, stripeSessionId);
  };

  public query func getPaymentsForJob(jobId : Nat) : async [PaymentTypes.Payment] {
    PaymentLib.getPaymentsForJob(payments, jobId);
  };
};
