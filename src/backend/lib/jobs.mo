import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import Common "../types/common";
import Types "../types/jobs";

module {
  public func createJob(
    jobs : Map.Map<Nat, Types.Job>,
    nextId : Nat,
    caller : Principal,
    title : Text,
    description : Text,
    workType : Types.WorkType,
    location : Text,
    budget : Nat,
    timelineDays : Nat,
    requiredMaterials : ?Text,
    imageUrls : [Storage.ExternalBlob],
  ) : Types.Job {
    let job : Types.Job = {
      id = nextId;
      title;
      description;
      workType;
      location;
      budget;
      timelineDays;
      requiredMaterials;
      status = #open;
      posterPrincipal = caller;
      assignedWorker = null;
      imageUrls;
      createdAt = Time.now();
    };
    jobs.add(nextId, job);
    job;
  };

  public func getJob(
    jobs : Map.Map<Nat, Types.Job>,
    jobId : Nat,
  ) : ?Types.Job {
    jobs.get(jobId);
  };

  public func listJobs(
    jobs : Map.Map<Nat, Types.Job>,
  ) : [Types.Job] {
    jobs.values().toArray();
  };

  public func filterJobs(
    jobs : Map.Map<Nat, Types.Job>,
    location : ?Text,
    workType : ?Types.WorkType,
    maxBudget : ?Nat,
  ) : [Types.Job] {
    jobs.values().filter(func(j) {
      let locMatch = switch (location) {
        case null { true };
        case (?loc) { j.location == loc };
      };
      let typeMatch = switch (workType) {
        case null { true };
        case (?wt) { j.workType == wt };
      };
      let budgetMatch = switch (maxBudget) {
        case null { true };
        case (?mb) { j.budget <= mb };
      };
      locMatch and typeMatch and budgetMatch;
    }).toArray();
  };

  public func assignWorker(
    jobs : Map.Map<Nat, Types.Job>,
    jobId : Nat,
    workerPrincipal : Principal,
    caller : Principal,
  ) : () {
    let job = switch (jobs.get(jobId)) {
      case (?j) { j };
      case null { Runtime.trap("Job not found") };
    };
    if (job.posterPrincipal != caller) {
      Runtime.trap("Unauthorized: Only job poster can assign worker");
    };
    if (job.status != #open) {
      Runtime.trap("Job is not open for assignment");
    };
    jobs.add(jobId, { job with status = #assigned; assignedWorker = ?workerPrincipal });
  };

  public func updateJobStatus(
    jobs : Map.Map<Nat, Types.Job>,
    jobId : Nat,
    status : Types.JobStatus,
    caller : Principal,
  ) : () {
    let job = switch (jobs.get(jobId)) {
      case (?j) { j };
      case null { Runtime.trap("Job not found") };
    };
    if (job.posterPrincipal != caller) {
      Runtime.trap("Unauthorized: Only job poster can update status");
    };
    jobs.add(jobId, { job with status });
  };

  public func cancelJob(
    jobs : Map.Map<Nat, Types.Job>,
    jobId : Nat,
    caller : Principal,
  ) : () {
    let job = switch (jobs.get(jobId)) {
      case (?j) { j };
      case null { Runtime.trap("Job not found") };
    };
    if (job.posterPrincipal != caller) {
      Runtime.trap("Unauthorized: Only job poster can cancel");
    };
    if (job.status == #completed) {
      Runtime.trap("Cannot cancel a completed job");
    };
    jobs.add(jobId, { job with status = #cancelled });
  };
};
