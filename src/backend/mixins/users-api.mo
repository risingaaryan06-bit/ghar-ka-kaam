import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserLib "../lib/users";
import UserTypes "../types/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
) {
  public shared ({ caller }) func createUserProfile(
    name : Text,
    phone : Text,
    location : Text,
    role : UserTypes.UserRole,
  ) : async UserTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    UserLib.createProfile(userProfiles, caller, name, phone, location, role);
  };

  public shared ({ caller }) func updateUserProfile(
    name : Text,
    phone : Text,
    location : Text,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    UserLib.updateProfile(userProfiles, caller, name, phone, location);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(userId : Principal) : async ?UserTypes.UserProfile {
    userProfiles.get(userId);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserTypes.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    userProfiles.add(caller, { profile with id = caller });
  };

  public query func listWorkers() : async [UserTypes.UserProfile] {
    UserLib.listWorkers(userProfiles);
  };

  public query func listMaids() : async [UserTypes.UserProfile] {
    UserLib.listMaids(userProfiles);
  };
};
