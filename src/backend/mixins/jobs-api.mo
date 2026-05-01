import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import JobLib "../lib/jobs";
import NotifLib "../lib/notifications";
import UserLib "../lib/users";
import Common "../types/common";
import UserTypes "../types/users";
import JobTypes "../types/jobs";
import NotifTypes "../types/notifications";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  jobs : Map.Map<Nat, JobTypes.Job>,
  notifications : Map.Map<Nat, NotifTypes.Notification>,
  nextJobId : Common.Counter,
  nextNotifId : Common.Counter,
) {
  public shared ({ caller }) func postJob(
    title : Text,
    description : Text,
    workType : JobTypes.WorkType,
    location : Text,
    budget : Nat,
    timelineDays : Nat,
    requiredMaterials : ?Text,
    imageUrls : [Storage.ExternalBlob],
  ) : async JobTypes.Job {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let job = JobLib.createJob(jobs, nextJobId.value, caller, title, description, workType, location, budget, timelineDays, requiredMaterials, imageUrls);
    nextJobId.value += 1;
    job;
  };

  public query func getJob(jobId : Nat) : async ?JobTypes.Job {
    JobLib.getJob(jobs, jobId);
  };

  public query func listJobs() : async [JobTypes.Job] {
    JobLib.listJobs(jobs);
  };

  public query func filterJobs(
    location : ?Text,
    workType : ?JobTypes.WorkType,
    maxBudget : ?Nat,
  ) : async [JobTypes.Job] {
    JobLib.filterJobs(jobs, location, workType, maxBudget);
  };

  public query ({ caller }) func getMyPostedJobs() : async [JobTypes.Job] {
    jobs.values().filter(func(j) { j.posterPrincipal == caller }).toArray();
  };

  public shared ({ caller }) func cancelJob(jobId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    JobLib.cancelJob(jobs, jobId, caller);
  };

  public shared ({ caller }) func completeJob(jobId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    JobLib.updateJobStatus(jobs, jobId, #completed, caller);
  };

  public shared ({ caller }) func assignWorker(jobId : Nat, workerPrincipal : Principal) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    JobLib.assignWorker(jobs, jobId, workerPrincipal, caller);
    let job = switch (JobLib.getJob(jobs, jobId)) {
      case (?j) { j };
      case null { Runtime.trap("Job not found") };
    };
    ignore NotifLib.createNotification(notifications, nextNotifId.value, workerPrincipal, "You have been assigned to the job: " # job.title, ?jobId);
    nextNotifId.value += 1;
  };

  public query func getPlatformStats() : async { totalJobs : Nat; totalWorkers : Nat; totalCompletedJobs : Nat } {
    let totalJobs = jobs.size();
    let totalWorkers = userProfiles.values().filter(func(p) { p.role == #laborer or p.role == #maid }).toArray().size();
    let totalCompletedJobs = jobs.values().filter(func(j) { j.status == #completed }).toArray().size();
    { totalJobs; totalWorkers; totalCompletedJobs };
  };
};
