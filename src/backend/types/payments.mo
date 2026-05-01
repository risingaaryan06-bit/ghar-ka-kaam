import Common "common";

module {
  public type PaymentType = { #deposit; #completion };
  public type PaymentStatus = { #pending; #paid };

  public type Payment = {
    id : Common.PaymentId;
    jobId : Common.JobId;
    homeownerPrincipal : Common.UserId;
    amountPaid : Nat;
    paymentType : PaymentType;
    stripeSessionId : Text;
    status : PaymentStatus;
    createdAt : Common.Timestamp;
  };
};
