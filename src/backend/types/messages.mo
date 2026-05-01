import Common "common";

module {
  public type Message = {
    id : Common.MessageId;
    jobId : Common.JobId;
    senderPrincipal : Common.UserId;
    content : Text;
    createdAt : Common.Timestamp;
  };
};
