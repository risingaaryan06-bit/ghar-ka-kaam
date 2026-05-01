module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type JobId = Nat;
  public type ReviewId = Nat;
  public type MessageId = Nat;
  public type PaymentId = Nat;
  public type NotificationId = Nat;

  // Mutable counter — use as mixin param instead of `var Nat`
  public type Counter = { var value : Nat };
  public func counter() : Counter = { var value = 0 };
};
