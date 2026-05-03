import { p as Record, q as Opt, V as Variant, s as Vec, t as Service, F as Func, v as Text, N as Nat, w as Principal, x as Nat8, y as Null, z as Bool, I as Int, A as Float64 } from "./index-Bl6m0gAG.js";
const _ImmutableObjectStorageCreateCertificateResult = Record({
  "method": Text,
  "blob_hash": Text
});
const _ImmutableObjectStorageRefillInformation = Record({
  "proposed_top_up_amount": Opt(Nat)
});
const _ImmutableObjectStorageRefillResult = Record({
  "success": Opt(Bool),
  "topped_up_amount": Opt(Nat)
});
const UserRole__1 = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const ShoppingItem = Record({
  "productName": Text,
  "currency": Text,
  "quantity": Nat,
  "priceInCents": Nat,
  "productDescription": Text
});
const ReviewId = Nat;
const Timestamp = Int;
const JobId = Nat;
const UserId = Principal;
const Review = Record({
  "id": ReviewId,
  "createdAt": Timestamp,
  "jobId": JobId,
  "comment": Text,
  "reviewerPrincipal": UserId,
  "rating": Nat,
  "revieweePrincipal": UserId
});
const UserRole = Variant({
  "laborer": Null,
  "maid": Null,
  "homeowner": Null
});
const UserProfile = Record({
  "id": UserId,
  "yearsExperience": Opt(Nat),
  "name": Text,
  "createdAt": Timestamp,
  "role": UserRole,
  "averageRating": Opt(Float64),
  "maidCategory": Opt(Text),
  "phone": Text,
  "completedJobsCount": Opt(Nat),
  "skills": Opt(Vec(Text)),
  "location": Text
});
const WorkType = Variant({
  "other": Null,
  "cook": Null,
  "houseCleaner": Null,
  "plumbing": Null,
  "painting": Null,
  "general": Null,
  "electrical": Null,
  "babysitter": Null,
  "maidServices": Null,
  "childcare": Null,
  "laundry": Null,
  "carpentry": Null,
  "masonry": Null
});
const JobStatus = Variant({
  "assigned": Null,
  "cancelled": Null,
  "open": Null,
  "completed": Null
});
const ExternalBlob = Vec(Nat8);
const Job = Record({
  "id": JobId,
  "status": JobStatus,
  "workType": WorkType,
  "title": Text,
  "imageUrls": Vec(ExternalBlob),
  "timelineDays": Nat,
  "createdAt": Timestamp,
  "assignedWorker": Opt(UserId),
  "description": Text,
  "requiredMaterials": Opt(Text),
  "budget": Nat,
  "posterPrincipal": UserId,
  "location": Text
});
const MessageId = Nat;
const Message = Record({
  "id": MessageId,
  "content": Text,
  "createdAt": Timestamp,
  "jobId": JobId,
  "senderPrincipal": UserId
});
const NotificationId = Nat;
const Notification = Record({
  "id": NotificationId,
  "createdAt": Timestamp,
  "read": Bool,
  "relatedJobId": Opt(JobId),
  "messageText": Text,
  "userPrincipal": UserId
});
const PaymentId = Nat;
const PaymentStatus = Variant({
  "pending": Null,
  "paid": Null
});
const PaymentType = Variant({
  "completion": Null,
  "deposit": Null
});
const Payment = Record({
  "id": PaymentId,
  "status": PaymentStatus,
  "homeownerPrincipal": UserId,
  "createdAt": Timestamp,
  "jobId": JobId,
  "amountPaid": Nat,
  "paymentType": PaymentType,
  "stripeSessionId": Text
});
const StripeSessionStatus = Variant({
  "completed": Record({
    "userPrincipal": Opt(Text),
    "response": Text
  }),
  "failed": Record({ "error": Text })
});
const StripeConfiguration = Record({
  "allowedCountries": Vec(Text),
  "secretKey": Text
});
const http_header = Record({
  "value": Text,
  "name": Text
});
const http_request_result = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
const TransformationInput = Record({
  "context": Vec(Nat8),
  "response": http_request_result
});
const TransformationOutput = Record({
  "status": Nat,
  "body": Vec(Nat8),
  "headers": Vec(http_header)
});
Service({
  "_immutableObjectStorageBlobsAreLive": Func(
    [Vec(Vec(Nat8))],
    [Vec(Bool)],
    ["query"]
  ),
  "_immutableObjectStorageBlobsToDelete": Func(
    [],
    [Vec(Vec(Nat8))],
    ["query"]
  ),
  "_immutableObjectStorageConfirmBlobDeletion": Func(
    [Vec(Vec(Nat8))],
    [],
    []
  ),
  "_immutableObjectStorageCreateCertificate": Func(
    [Text],
    [_ImmutableObjectStorageCreateCertificateResult],
    []
  ),
  "_immutableObjectStorageRefillCashier": Func(
    [Opt(_ImmutableObjectStorageRefillInformation)],
    [_ImmutableObjectStorageRefillResult],
    []
  ),
  "_immutableObjectStorageUpdateGatewayPrincipals": Func([], [], []),
  "_initializeAccessControl": Func([], [], []),
  "assignCallerUserRole": Func([Principal, UserRole__1], [], []),
  "assignWorker": Func([Nat, Principal], [], []),
  "cancelJob": Func([Nat], [], []),
  "completeJob": Func([Nat], [], []),
  "confirmPayment": Func([Text], [], []),
  "createCheckoutSession": Func(
    [Vec(ShoppingItem), Text, Text],
    [Text],
    []
  ),
  "createReview": Func(
    [Principal, Nat, Nat, Text],
    [Review],
    []
  ),
  "createUserProfile": Func(
    [Text, Text, Text, UserRole],
    [UserProfile],
    []
  ),
  "filterJobs": Func(
    [Opt(Text), Opt(WorkType), Opt(Nat)],
    [Vec(Job)],
    ["query"]
  ),
  "getCallerUserProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getCallerUserRole": Func([], [UserRole__1], ["query"]),
  "getJob": Func([Nat], [Opt(Job)], ["query"]),
  "getMessagesForJob": Func([Nat], [Vec(Message)], ["query"]),
  "getMyNotifications": Func([], [Vec(Notification)], ["query"]),
  "getMyPostedJobs": Func([], [Vec(Job)], ["query"]),
  "getPaymentsForJob": Func([Nat], [Vec(Payment)], ["query"]),
  "getPlatformStats": Func(
    [],
    [
      Record({
        "totalCompletedJobs": Nat,
        "totalWorkers": Nat,
        "totalJobs": Nat
      })
    ],
    ["query"]
  ),
  "getReviewsForJob": Func([Nat], [Vec(Review)], ["query"]),
  "getReviewsForUser": Func([Principal], [Vec(Review)], ["query"]),
  "getStripeSessionStatus": Func([Text], [StripeSessionStatus], []),
  "getUserProfile": Func(
    [Principal],
    [Opt(UserProfile)],
    ["query"]
  ),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "isStripeConfigured": Func([], [Bool], ["query"]),
  "listJobs": Func([], [Vec(Job)], ["query"]),
  "listMaids": Func([], [Vec(UserProfile)], ["query"]),
  "listWorkers": Func([], [Vec(UserProfile)], ["query"]),
  "markAllNotificationsRead": Func([], [], []),
  "markNotificationRead": Func([Nat], [], []),
  "postJob": Func(
    [
      Text,
      Text,
      WorkType,
      Text,
      Nat,
      Nat,
      Opt(Text),
      Vec(ExternalBlob)
    ],
    [Job],
    []
  ),
  "recordPayment": Func(
    [Nat, Nat, PaymentType, Text],
    [Payment],
    []
  ),
  "saveCallerUserProfile": Func([UserProfile], [], []),
  "sendMessage": Func([Nat, Text], [Message], []),
  "setStripeConfiguration": Func([StripeConfiguration], [], []),
  "transform": Func(
    [TransformationInput],
    [TransformationOutput],
    ["query"]
  ),
  "updateUserProfile": Func([Text, Text, Text], [], [])
});
const idlFactory = ({ IDL }) => {
  const _ImmutableObjectStorageCreateCertificateResult2 = IDL.Record({
    "method": IDL.Text,
    "blob_hash": IDL.Text
  });
  const _ImmutableObjectStorageRefillInformation2 = IDL.Record({
    "proposed_top_up_amount": IDL.Opt(IDL.Nat)
  });
  const _ImmutableObjectStorageRefillResult2 = IDL.Record({
    "success": IDL.Opt(IDL.Bool),
    "topped_up_amount": IDL.Opt(IDL.Nat)
  });
  const UserRole__12 = IDL.Variant({
    "admin": IDL.Null,
    "user": IDL.Null,
    "guest": IDL.Null
  });
  const ShoppingItem2 = IDL.Record({
    "productName": IDL.Text,
    "currency": IDL.Text,
    "quantity": IDL.Nat,
    "priceInCents": IDL.Nat,
    "productDescription": IDL.Text
  });
  const ReviewId2 = IDL.Nat;
  const Timestamp2 = IDL.Int;
  const JobId2 = IDL.Nat;
  const UserId2 = IDL.Principal;
  const Review2 = IDL.Record({
    "id": ReviewId2,
    "createdAt": Timestamp2,
    "jobId": JobId2,
    "comment": IDL.Text,
    "reviewerPrincipal": UserId2,
    "rating": IDL.Nat,
    "revieweePrincipal": UserId2
  });
  const UserRole2 = IDL.Variant({
    "laborer": IDL.Null,
    "maid": IDL.Null,
    "homeowner": IDL.Null
  });
  const UserProfile2 = IDL.Record({
    "id": UserId2,
    "yearsExperience": IDL.Opt(IDL.Nat),
    "name": IDL.Text,
    "createdAt": Timestamp2,
    "role": UserRole2,
    "averageRating": IDL.Opt(IDL.Float64),
    "maidCategory": IDL.Opt(IDL.Text),
    "phone": IDL.Text,
    "completedJobsCount": IDL.Opt(IDL.Nat),
    "skills": IDL.Opt(IDL.Vec(IDL.Text)),
    "location": IDL.Text
  });
  const WorkType2 = IDL.Variant({
    "other": IDL.Null,
    "cook": IDL.Null,
    "houseCleaner": IDL.Null,
    "plumbing": IDL.Null,
    "painting": IDL.Null,
    "general": IDL.Null,
    "electrical": IDL.Null,
    "babysitter": IDL.Null,
    "maidServices": IDL.Null,
    "childcare": IDL.Null,
    "laundry": IDL.Null,
    "carpentry": IDL.Null,
    "masonry": IDL.Null
  });
  const JobStatus2 = IDL.Variant({
    "assigned": IDL.Null,
    "cancelled": IDL.Null,
    "open": IDL.Null,
    "completed": IDL.Null
  });
  const ExternalBlob2 = IDL.Vec(IDL.Nat8);
  const Job2 = IDL.Record({
    "id": JobId2,
    "status": JobStatus2,
    "workType": WorkType2,
    "title": IDL.Text,
    "imageUrls": IDL.Vec(ExternalBlob2),
    "timelineDays": IDL.Nat,
    "createdAt": Timestamp2,
    "assignedWorker": IDL.Opt(UserId2),
    "description": IDL.Text,
    "requiredMaterials": IDL.Opt(IDL.Text),
    "budget": IDL.Nat,
    "posterPrincipal": UserId2,
    "location": IDL.Text
  });
  const MessageId2 = IDL.Nat;
  const Message2 = IDL.Record({
    "id": MessageId2,
    "content": IDL.Text,
    "createdAt": Timestamp2,
    "jobId": JobId2,
    "senderPrincipal": UserId2
  });
  const NotificationId2 = IDL.Nat;
  const Notification2 = IDL.Record({
    "id": NotificationId2,
    "createdAt": Timestamp2,
    "read": IDL.Bool,
    "relatedJobId": IDL.Opt(JobId2),
    "messageText": IDL.Text,
    "userPrincipal": UserId2
  });
  const PaymentId2 = IDL.Nat;
  const PaymentStatus2 = IDL.Variant({
    "pending": IDL.Null,
    "paid": IDL.Null
  });
  const PaymentType2 = IDL.Variant({
    "completion": IDL.Null,
    "deposit": IDL.Null
  });
  const Payment2 = IDL.Record({
    "id": PaymentId2,
    "status": PaymentStatus2,
    "homeownerPrincipal": UserId2,
    "createdAt": Timestamp2,
    "jobId": JobId2,
    "amountPaid": IDL.Nat,
    "paymentType": PaymentType2,
    "stripeSessionId": IDL.Text
  });
  const StripeSessionStatus2 = IDL.Variant({
    "completed": IDL.Record({
      "userPrincipal": IDL.Opt(IDL.Text),
      "response": IDL.Text
    }),
    "failed": IDL.Record({ "error": IDL.Text })
  });
  const StripeConfiguration2 = IDL.Record({
    "allowedCountries": IDL.Vec(IDL.Text),
    "secretKey": IDL.Text
  });
  const http_header2 = IDL.Record({ "value": IDL.Text, "name": IDL.Text });
  const http_request_result2 = IDL.Record({
    "status": IDL.Nat,
    "body": IDL.Vec(IDL.Nat8),
    "headers": IDL.Vec(http_header2)
  });
  const TransformationInput2 = IDL.Record({
    "context": IDL.Vec(IDL.Nat8),
    "response": http_request_result2
  });
  const TransformationOutput2 = IDL.Record({
    "status": IDL.Nat,
    "body": IDL.Vec(IDL.Nat8),
    "headers": IDL.Vec(http_header2)
  });
  return IDL.Service({
    "_immutableObjectStorageBlobsAreLive": IDL.Func(
      [IDL.Vec(IDL.Vec(IDL.Nat8))],
      [IDL.Vec(IDL.Bool)],
      ["query"]
    ),
    "_immutableObjectStorageBlobsToDelete": IDL.Func(
      [],
      [IDL.Vec(IDL.Vec(IDL.Nat8))],
      ["query"]
    ),
    "_immutableObjectStorageConfirmBlobDeletion": IDL.Func(
      [IDL.Vec(IDL.Vec(IDL.Nat8))],
      [],
      []
    ),
    "_immutableObjectStorageCreateCertificate": IDL.Func(
      [IDL.Text],
      [_ImmutableObjectStorageCreateCertificateResult2],
      []
    ),
    "_immutableObjectStorageRefillCashier": IDL.Func(
      [IDL.Opt(_ImmutableObjectStorageRefillInformation2)],
      [_ImmutableObjectStorageRefillResult2],
      []
    ),
    "_immutableObjectStorageUpdateGatewayPrincipals": IDL.Func([], [], []),
    "_initializeAccessControl": IDL.Func([], [], []),
    "assignCallerUserRole": IDL.Func([IDL.Principal, UserRole__12], [], []),
    "assignWorker": IDL.Func([IDL.Nat, IDL.Principal], [], []),
    "cancelJob": IDL.Func([IDL.Nat], [], []),
    "completeJob": IDL.Func([IDL.Nat], [], []),
    "confirmPayment": IDL.Func([IDL.Text], [], []),
    "createCheckoutSession": IDL.Func(
      [IDL.Vec(ShoppingItem2), IDL.Text, IDL.Text],
      [IDL.Text],
      []
    ),
    "createReview": IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Nat, IDL.Text],
      [Review2],
      []
    ),
    "createUserProfile": IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, UserRole2],
      [UserProfile2],
      []
    ),
    "filterJobs": IDL.Func(
      [IDL.Opt(IDL.Text), IDL.Opt(WorkType2), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Job2)],
      ["query"]
    ),
    "getCallerUserProfile": IDL.Func([], [IDL.Opt(UserProfile2)], ["query"]),
    "getCallerUserRole": IDL.Func([], [UserRole__12], ["query"]),
    "getJob": IDL.Func([IDL.Nat], [IDL.Opt(Job2)], ["query"]),
    "getMessagesForJob": IDL.Func([IDL.Nat], [IDL.Vec(Message2)], ["query"]),
    "getMyNotifications": IDL.Func([], [IDL.Vec(Notification2)], ["query"]),
    "getMyPostedJobs": IDL.Func([], [IDL.Vec(Job2)], ["query"]),
    "getPaymentsForJob": IDL.Func([IDL.Nat], [IDL.Vec(Payment2)], ["query"]),
    "getPlatformStats": IDL.Func(
      [],
      [
        IDL.Record({
          "totalCompletedJobs": IDL.Nat,
          "totalWorkers": IDL.Nat,
          "totalJobs": IDL.Nat
        })
      ],
      ["query"]
    ),
    "getReviewsForJob": IDL.Func([IDL.Nat], [IDL.Vec(Review2)], ["query"]),
    "getReviewsForUser": IDL.Func(
      [IDL.Principal],
      [IDL.Vec(Review2)],
      ["query"]
    ),
    "getStripeSessionStatus": IDL.Func([IDL.Text], [StripeSessionStatus2], []),
    "getUserProfile": IDL.Func(
      [IDL.Principal],
      [IDL.Opt(UserProfile2)],
      ["query"]
    ),
    "isCallerAdmin": IDL.Func([], [IDL.Bool], ["query"]),
    "isStripeConfigured": IDL.Func([], [IDL.Bool], ["query"]),
    "listJobs": IDL.Func([], [IDL.Vec(Job2)], ["query"]),
    "listMaids": IDL.Func([], [IDL.Vec(UserProfile2)], ["query"]),
    "listWorkers": IDL.Func([], [IDL.Vec(UserProfile2)], ["query"]),
    "markAllNotificationsRead": IDL.Func([], [], []),
    "markNotificationRead": IDL.Func([IDL.Nat], [], []),
    "postJob": IDL.Func(
      [
        IDL.Text,
        IDL.Text,
        WorkType2,
        IDL.Text,
        IDL.Nat,
        IDL.Nat,
        IDL.Opt(IDL.Text),
        IDL.Vec(ExternalBlob2)
      ],
      [Job2],
      []
    ),
    "recordPayment": IDL.Func(
      [IDL.Nat, IDL.Nat, PaymentType2, IDL.Text],
      [Payment2],
      []
    ),
    "saveCallerUserProfile": IDL.Func([UserProfile2], [], []),
    "sendMessage": IDL.Func([IDL.Nat, IDL.Text], [Message2], []),
    "setStripeConfiguration": IDL.Func([StripeConfiguration2], [], []),
    "transform": IDL.Func(
      [TransformationInput2],
      [TransformationOutput2],
      ["query"]
    ),
    "updateUserProfile": IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], [])
  });
};
const WORK_TYPE_META = {
  masonry: {
    label: "Masonry",
    icon: "🧱",
    color: "bg-orange-100 text-orange-800",
    category: "construction"
  },
  carpentry: {
    label: "Carpentry",
    icon: "🪚",
    color: "bg-amber-100 text-amber-800",
    category: "construction"
  },
  painting: {
    label: "Painting",
    icon: "🖌️",
    color: "bg-blue-100 text-blue-800",
    category: "construction"
  },
  electrical: {
    label: "Electrical",
    icon: "⚡",
    color: "bg-yellow-100 text-yellow-800",
    category: "construction"
  },
  plumbing: {
    label: "Plumbing",
    icon: "🔧",
    color: "bg-cyan-100 text-cyan-800",
    category: "construction"
  },
  general: {
    label: "General Labor",
    icon: "🔨",
    color: "bg-stone-100 text-stone-800",
    category: "construction"
  },
  // Maid / home services
  maidServices: {
    label: "Maid Services",
    icon: "🏠",
    color: "bg-pink-100 text-pink-800",
    category: "maid"
  },
  cook: {
    label: "Cook",
    icon: "👩‍🍳",
    color: "bg-rose-100 text-rose-800",
    category: "maid"
  },
  houseCleaner: {
    label: "House Cleaner",
    icon: "🧹",
    color: "bg-purple-100 text-purple-800",
    category: "maid"
  },
  laundry: {
    label: "Laundry",
    icon: "👕",
    color: "bg-indigo-100 text-indigo-800",
    category: "maid"
  },
  childcare: {
    label: "Childcare",
    icon: "👶",
    color: "bg-green-100 text-green-800",
    category: "maid"
  },
  babysitter: {
    label: "Babysitter",
    icon: "🍼",
    color: "bg-teal-100 text-teal-800",
    category: "maid"
  },
  other: {
    label: "Other",
    icon: "🛠️",
    color: "bg-muted text-muted-foreground",
    category: "construction"
  }
};
const MAID_WORK_TYPES = Object.entries(WORK_TYPE_META).filter(([, meta]) => meta.category === "maid").map(([key]) => key);
const CONSTRUCTION_WORK_TYPES = Object.entries(WORK_TYPE_META).filter(([, meta]) => meta.category === "construction").map(([key]) => key);
function formatBudget(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
function timeAgo(timestamp) {
  const now = Date.now();
  const ts = Number(timestamp) / 1e6;
  const diff = now - ts;
  const hours = Math.floor(diff / 36e5);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
export {
  CONSTRUCTION_WORK_TYPES as C,
  MAID_WORK_TYPES as M,
  WORK_TYPE_META as W,
  formatBudget as f,
  idlFactory as i,
  timeAgo as t
};
