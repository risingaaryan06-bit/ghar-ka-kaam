import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/payments";

module {
  public func recordPayment(
    payments : Map.Map<Nat, Types.Payment>,
    nextId : Nat,
    jobId : Nat,
    caller : Principal,
    amountPaid : Nat,
    paymentType : Types.PaymentType,
    stripeSessionId : Text,
  ) : Types.Payment {
    let payment : Types.Payment = {
      id = nextId;
      jobId;
      homeownerPrincipal = caller;
      amountPaid;
      paymentType;
      stripeSessionId;
      status = #pending;
      createdAt = Time.now();
    };
    payments.add(nextId, payment);
    payment;
  };

  public func confirmPayment(
    payments : Map.Map<Nat, Types.Payment>,
    stripeSessionId : Text,
  ) : () {
    payments.forEach(func(id, payment) {
      if (payment.stripeSessionId == stripeSessionId and payment.status == #pending) {
        payments.add(id, { payment with status = #paid });
      };
    });
  };

  public func getPaymentsForJob(
    payments : Map.Map<Nat, Types.Payment>,
    jobId : Nat,
  ) : [Types.Payment] {
    payments.values().filter(func(p) { p.jobId == jobId }).toArray();
  };
};
