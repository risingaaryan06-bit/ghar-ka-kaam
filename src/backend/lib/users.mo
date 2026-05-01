import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/users";

module {
  public func createProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    name : Text,
    phone : Text,
    location : Text,
    role : Types.UserRole,
  ) : Types.UserProfile {
    let existing = profiles.get(caller);
    switch (existing) {
      case (?_) { Runtime.trap("Profile already exists") };
      case null {};
    };
    let isWorker = role == #laborer or role == #maid;
    let profile : Types.UserProfile = {
      id = caller;
      name;
      phone;
      location;
      role;
      createdAt = Time.now();
      skills = if (isWorker) { ?[] } else { null };
      yearsExperience = if (isWorker) { ?0 } else { null };
      completedJobsCount = if (isWorker) { ?0 } else { null };
      averageRating = if (isWorker) { ?0.0 } else { null };
      maidCategory = null;
    };
    profiles.add(caller, profile);
    profile;
  };

  public func updateProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    name : Text,
    phone : Text,
    location : Text,
  ) : () {
    let existing = switch (profiles.get(caller)) {
      case (?p) { p };
      case null { Runtime.trap("Profile not found") };
    };
    profiles.add(caller, { existing with name; phone; location });
  };

  public func getProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    userId : Principal,
  ) : ?Types.UserProfile {
    profiles.get(userId);
  };

  public func updateWorkerStats(
    profiles : Map.Map<Principal, Types.UserProfile>,
    workerId : Principal,
    completedJobs : Nat,
    averageRating : Float,
  ) : () {
    let existing = switch (profiles.get(workerId)) {
      case (?p) { p };
      case null { Runtime.trap("Worker profile not found") };
    };
    profiles.add(workerId, {
      existing with
      completedJobsCount = ?completedJobs;
      averageRating = ?averageRating;
    });
  };

  public func listWorkers(
    profiles : Map.Map<Principal, Types.UserProfile>,
  ) : [Types.UserProfile] {
    profiles.values().filter(func(p) { p.role == #laborer or p.role == #maid }).toArray();
  };

  public func listMaids(
    profiles : Map.Map<Principal, Types.UserProfile>,
  ) : [Types.UserProfile] {
    profiles.values().filter(func(p) { p.role == #maid }).toArray();
  };
};
