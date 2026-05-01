import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type WorkType = {
    #painting;
    #carpentry;
    #plumbing;
    #electrical;
    #masonry;
    #general;
    #other;
    #maidServices;
    #cook;
    #houseCleaner;
    #laundry;
    #childcare;
    #babysitter;
  };

  public type JobStatus = {
    #open;
    #assigned;
    #completed;
    #cancelled;
  };

  public type Job = {
    id : Common.JobId;
    title : Text;
    description : Text;
    workType : WorkType;
    location : Text;
    budget : Nat;
    timelineDays : Nat;
    requiredMaterials : ?Text;
    status : JobStatus;
    posterPrincipal : Common.UserId;
    assignedWorker : ?Common.UserId;
    imageUrls : [Storage.ExternalBlob];
    createdAt : Common.Timestamp;
  };
};
