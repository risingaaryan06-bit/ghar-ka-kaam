import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/messages";
import JobTypes "../types/jobs";

module {
  public func sendMessage(
    messages : Map.Map<Nat, Types.Message>,
    nextId : Nat,
    jobId : Nat,
    caller : Principal,
    content : Text,
  ) : Types.Message {
    let msg : Types.Message = {
      id = nextId;
      jobId;
      senderPrincipal = caller;
      content;
      createdAt = Time.now();
    };
    messages.add(nextId, msg);
    msg;
  };

  public func getMessagesForJob(
    messages : Map.Map<Nat, Types.Message>,
    jobs : Map.Map<Nat, JobTypes.Job>,
    jobId : Nat,
    caller : Principal,
  ) : [Types.Message] {
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
      Runtime.trap("Unauthorized: Only job homeowner or assigned worker can read messages");
    };
    messages.values().filter(func(m) { m.jobId == jobId }).toArray();
  };
};
