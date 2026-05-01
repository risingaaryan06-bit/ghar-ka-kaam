import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import NotifLib "../lib/notifications";
import NotifTypes "../types/notifications";

mixin (
  accessControlState : AccessControl.AccessControlState,
  notifications : Map.Map<Nat, NotifTypes.Notification>,
) {
  public query ({ caller }) func getMyNotifications() : async [NotifTypes.Notification] {
    NotifLib.getNotificationsForUser(notifications, caller);
  };

  public shared ({ caller }) func markNotificationRead(notificationId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    NotifLib.markNotificationRead(notifications, notificationId, caller);
  };

  public shared ({ caller }) func markAllNotificationsRead() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    NotifLib.markAllNotificationsRead(notifications, caller);
  };
};
