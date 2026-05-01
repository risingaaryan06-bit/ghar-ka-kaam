import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MessageLib "../lib/messages";
import NotifLib "../lib/notifications";
import Common "../types/common";
import UserTypes "../types/users";
import JobTypes "../types/jobs";
import MsgTypes "../types/messages";
import NotifTypes "../types/notifications";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  jobs : Map.Map<Nat, JobTypes.Job>,
  messages : Map.Map<Nat, MsgTypes.Message>,
  notifications : Map.Map<Nat, NotifTypes.Notification>,
  nextMessageId : Common.Counter,
  nextNotifId : Common.Counter,
) {
  public shared ({ caller }) func sendMessage(
    jobId : Nat,
    content : Text,
  ) : async MsgTypes.Message {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let job = switch (jobs.get(jobId)) {
      case (?j) { j };
      case null { Runtime.trap("Job not found") };
    };
    let isParticipant = job.posterPrincipal == caller or (
      switch (job.assignedWorker) {
        case (?w) { w == caller };
        case null { false };
      }
    );
    if (not isParticipant) {
      Runtime.trap("Unauthorized: Only job participants can send messages");
    };
    let msg = MessageLib.sendMessage(messages, nextMessageId.value, jobId, caller, content);
    nextMessageId.value += 1;
    // Notify the other participant
    let recipient = if (caller == job.posterPrincipal) {
      job.assignedWorker;
    } else {
      ?job.posterPrincipal;
    };
    switch (recipient) {
      case (?r) {
        ignore NotifLib.createNotification(notifications, nextNotifId.value, r, "New message on job: " # job.title, ?jobId);
        nextNotifId.value += 1;
      };
      case null {};
    };
    msg;
  };

  public query ({ caller }) func getMessagesForJob(jobId : Nat) : async [MsgTypes.Message] {
    MessageLib.getMessagesForJob(messages, jobs, jobId, caller);
  };
};
