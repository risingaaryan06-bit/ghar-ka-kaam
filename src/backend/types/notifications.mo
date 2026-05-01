import Common "common";

module {
  public type Notification = {
    id : Common.NotificationId;
    userPrincipal : Common.UserId;
    messageText : Text;
    relatedJobId : ?Common.JobId;
    read : Bool;
    createdAt : Common.Timestamp;
  };
};
