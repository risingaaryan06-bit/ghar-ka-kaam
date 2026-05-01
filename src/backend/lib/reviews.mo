import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Common "../types/common";
import Types "../types/reviews";

module {
  public func createReview(
    reviews : Map.Map<Nat, Types.Review>,
    nextId : Nat,
    caller : Principal,
    revieweePrincipal : Principal,
    jobId : Nat,
    rating : Nat,
    comment : Text,
  ) : Types.Review {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let review : Types.Review = {
      id = nextId;
      reviewerPrincipal = caller;
      revieweePrincipal;
      jobId;
      rating;
      comment;
      createdAt = Time.now();
    };
    reviews.add(nextId, review);
    review;
  };

  public func getReviewsForUser(
    reviews : Map.Map<Nat, Types.Review>,
    userId : Principal,
  ) : [Types.Review] {
    reviews.values().filter(func(r) { r.revieweePrincipal == userId }).toArray();
  };

  public func getReviewsForJob(
    reviews : Map.Map<Nat, Types.Review>,
    jobId : Nat,
  ) : [Types.Review] {
    reviews.values().filter(func(r) { r.jobId == jobId }).toArray();
  };

  public func computeAverageRating(
    reviews : Map.Map<Nat, Types.Review>,
    userId : Principal,
  ) : Float {
    let userReviews = reviews.values().filter(func(r) { r.revieweePrincipal == userId }).toArray();
    let count = userReviews.size();
    if (count == 0) { return 0.0 };
    let total = userReviews.foldLeft(0, func(acc, r) { acc + r.rating });
    total.toFloat() / count.toFloat();
  };
};
