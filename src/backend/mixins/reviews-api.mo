import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewLib "../lib/reviews";
import UserLib "../lib/users";
import Common "../types/common";
import UserTypes "../types/users";
import JobTypes "../types/jobs";
import ReviewTypes "../types/reviews";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  jobs : Map.Map<Nat, JobTypes.Job>,
  reviews : Map.Map<Nat, ReviewTypes.Review>,
  nextReviewId : Common.Counter,
) {
  public shared ({ caller }) func createReview(
    revieweePrincipal : Principal,
    jobId : Nat,
    rating : Nat,
    comment : Text,
  ) : async ReviewTypes.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let job = switch (jobs.get(jobId)) {
      case (?j) { j };
      case null { Runtime.trap("Job not found") };
    };
    if (job.status != #completed) {
      Runtime.trap("Can only review after job is completed");
    };
    // Only homeowner or assigned worker can leave a review
    let isParticipant = job.posterPrincipal == caller or (
      switch (job.assignedWorker) {
        case (?w) { w == caller };
        case null { false };
      }
    );
    if (not isParticipant) {
      Runtime.trap("Unauthorized: Only job participants can leave reviews");
    };
    let review = ReviewLib.createReview(reviews, nextReviewId.value, caller, revieweePrincipal, jobId, rating, comment);
    nextReviewId.value += 1;
    // Recompute average rating and update worker stats
    let newAvg = ReviewLib.computeAverageRating(reviews, revieweePrincipal);
    let workerReviews = ReviewLib.getReviewsForUser(reviews, revieweePrincipal);
    switch (userProfiles.get(revieweePrincipal)) {
      case (?p) {
        switch (p.role) {
          case (#laborer or #maid) {
            let completedCount = switch (p.completedJobsCount) {
              case (?c) { c };
              case null { 0 };
            };
            UserLib.updateWorkerStats(userProfiles, revieweePrincipal, completedCount, newAvg);
          };
          case (#homeowner) {};
        };
      };
      case null {};
    };
    review;
  };

  public query func getReviewsForUser(userId : Principal) : async [ReviewTypes.Review] {
    ReviewLib.getReviewsForUser(reviews, userId);
  };

  public query func getReviewsForJob(jobId : Nat) : async [ReviewTypes.Review] {
    ReviewLib.getReviewsForJob(reviews, jobId);
  };
};
