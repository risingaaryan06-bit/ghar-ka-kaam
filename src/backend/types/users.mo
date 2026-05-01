import Common "common";

module {
  public type UserRole = { #homeowner; #laborer; #maid };

  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    phone : Text;
    location : Text;
    role : UserRole;
    createdAt : Common.Timestamp;
    // Worker-specific extensions (null for homeowners)
    skills : ?[Text];
    yearsExperience : ?Nat;
    completedJobsCount : ?Nat;
    averageRating : ?Float;
    // Maid-specific category (e.g. "cook", "cleaner", "babysitter")
    maidCategory : ?Text;
  };
};
