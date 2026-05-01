import Common "common";

module {
  public type Review = {
    id : Common.ReviewId;
    reviewerPrincipal : Common.UserId;
    revieweePrincipal : Common.UserId;
    jobId : Common.JobId;
    rating : Nat; // 1-5
    comment : Text;
    createdAt : Common.Timestamp;
  };
};
