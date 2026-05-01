import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/notifications";

module {
  public func createNotification(
    notifications : Map.Map<Nat, Types.Notification>,
    nextId : Nat,
    userPrincipal : Principal,
    messageText : Text,
    relatedJobId : ?Nat,
  ) : Types.Notification {
    let notif : Types.Notification = {
      id = nextId;
      userPrincipal;
      messageText;
      relatedJobId;
      read = false;
      createdAt = Time.now();
    };
    notifications.add(nextId, notif);
    notif;
  };

  public func getNotificationsForUser(
    notifications : Map.Map<Nat, Types.Notification>,
    userPrincipal : Principal,
  ) : [Types.Notification] {
    notifications.values().filter(func(n) { n.userPrincipal == userPrincipal }).toArray();
  };

  public func markNotificationRead(
    notifications : Map.Map<Nat, Types.Notification>,
    notificationId : Nat,
    caller : Principal,
  ) : () {
    let notif = switch (notifications.get(notificationId)) {
      case (?n) { n };
      case null { Runtime.trap("Notification not found") };
    };
    if (notif.userPrincipal != caller) {
      Runtime.trap("Unauthorized: Cannot mark another user's notification as read");
    };
    notifications.add(notificationId, { notif with read = true });
  };

  public func markAllNotificationsRead(
    notifications : Map.Map<Nat, Types.Notification>,
    caller : Principal,
  ) : () {
    notifications.forEach(func(id, notif) {
      if (notif.userPrincipal == caller and not notif.read) {
        notifications.add(id, { notif with read = true });
      };
    });
  };
};
