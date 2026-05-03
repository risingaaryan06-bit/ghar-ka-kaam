import { c as createLucideIcon, m as useParams, n as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, i as PageLoader, b as Briefcase, L as Link, B as Button, S as Separator, u as ue } from "./index-Bl6m0gAG.js";
import { R as RatingDisplay } from "./StarRating-tS6JAhqF.js";
import { B as Badge } from "./badge-BnwEIvSF.js";
import { C as Card, a as CardContent } from "./card-BOlP-LKW.js";
import { I as Input } from "./input-Cwar-sC0.js";
import { S as Skeleton } from "./skeleton-Cl90XyEF.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, U as User } from "./tabs-CJ2DHDLm.js";
import { c as useGetJob, d as useGetMessagesForJob, e as useGetPaymentsForJob, f as useGetCallerProfile, g as useSendMessage, h as useGetUserProfile } from "./useQueries-DlGKg5lf.js";
import { W as WORK_TYPE_META, f as formatBudget, t as timeAgo } from "./types-DGUL2UgN.js";
import { A as ArrowLeft } from "./arrow-left-CeE17HnD.js";
import { P as PaymentType, J as JobStatus } from "./backend-DBy7dtNU.js";
import { C as Calendar } from "./calendar-FsnrWoOi.js";
import { M as MapPin } from "./index-CL8mI724.js";
import { C as Clock } from "./clock-Fe6S3N1I.js";
import { C as CreditCard } from "./credit-card-BXb6_VXb.js";
import { C as CircleCheck } from "./circle-check-C-fSTZgk.js";
import { S as Send } from "./send-Bf4lhWu3.js";
import "./star-FaVzG57j.js";
import "./index-CgEjvbCo.js";
import "./useActor-Bw0dW3YB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
function MessageBubble({
  message,
  isMine
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${isMine ? "justify-end" : "justify-start"} mb-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${isMine ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border rounded-tl-sm"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: message.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-[10px] mt-1 ${isMine ? "text-primary-foreground/70" : "text-muted-foreground"}`,
            children: timeAgo(message.createdAt)
          }
        )
      ]
    }
  ) });
}
function AssignedWorkerBanner({ workerId }) {
  const { data: profile } = useGetUserProfile(workerId);
  if (!profile) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-semibold uppercase tracking-wide", children: "Assigned Worker" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm truncate", children: profile.name }),
      profile.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "inline h-3 w-3 mr-0.5" }),
        profile.location
      ] })
    ] }),
    profile.averageRating !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingDisplay, { rating: profile.averageRating, size: "sm" }) })
  ] });
}
function JobDetailPage() {
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  const { identity } = useInternetIdentity();
  const myPrincipal = identity == null ? void 0 : identity.getPrincipal().toText();
  const jobIdBigInt = BigInt(jobId);
  const { data: job, isLoading } = useGetJob(jobIdBigInt);
  const { data: messages = [], isLoading: msgsLoading } = useGetMessagesForJob(jobIdBigInt);
  const { data: payments = [] } = useGetPaymentsForJob(jobIdBigInt);
  useGetCallerProfile();
  const sendMessage = useSendMessage();
  const [msgText, setMsgText] = reactExports.useState("");
  const messagesEndRef = reactExports.useRef(null);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Loading job details..." });
  if (!job) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-8 w-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-2", children: "Job not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "This job may have been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "job_detail.back_not_found.button",
          variant: "outline",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Back to Jobs"
          ]
        }
      ) })
    ] });
  }
  const meta = WORK_TYPE_META[job.workType] ?? WORK_TYPE_META.other;
  const isHomeowner = myPrincipal !== void 0 && job.posterPrincipal.toText() === myPrincipal;
  const hasDeposit = payments.some(
    (p) => p.paymentType === PaymentType.deposit
  );
  const handleSendMessage = () => {
    const content = msgText.trim();
    if (!content) return;
    sendMessage.mutate(
      { jobId: jobIdBigInt, content },
      {
        onSuccess: () => setMsgText(""),
        onError: (e) => ue.error(
          e instanceof Error ? e.message : "Failed to send message"
        )
      }
    );
  };
  const handlePayDeposit = () => {
    ue.info(
      "Payment gateway integration requires Stripe configuration. Contact the admin."
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "job_detail.back.button",
        variant: "ghost",
        size: "sm",
        className: "text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
          "Back to Jobs"
        ]
      }
    ) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated border-l-4 border-l-primary mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0", children: meta.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground leading-snug", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full font-medium ${meta.color}`,
                  children: meta.label
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: job.status === JobStatus.open ? "default" : job.status === JobStatus.assigned ? "secondary" : job.status === JobStatus.completed ? "outline" : "destructive",
              className: "flex-shrink-0",
              children: job.status === JobStatus.open ? "Open" : job.status === JobStatus.assigned ? "Assigned" : job.status === JobStatus.completed ? "Completed" : "Cancelled"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: job.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Budget" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: formatBudget(job.budget) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-sm flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-secondary" }),
              Number(job.timelineDays),
              "d"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-sm truncate flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-secondary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: job.location })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Posted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-sm flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-secondary" }),
              timeAgo(job.createdAt)
            ] })
          ] })
        ] }),
        job.requiredMaterials && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            "Required Materials:",
            " "
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: job.requiredMaterials })
        ] }),
        job.imageUrls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: job.imageUrls.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: img.getDirectURL(),
            alt: `Work site view ${i + 1} of ${job.imageUrls.length}`,
            className: "h-20 w-20 rounded-lg object-cover border border-border"
          },
          img.getDirectURL()
        )) }),
        job.assignedWorker && /* @__PURE__ */ jsxRuntimeExports.jsx(AssignedWorkerBanner, { workerId: job.assignedWorker.toText() }),
        isHomeowner && job.status === JobStatus.assigned && !hasDeposit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "job_detail.payment.section",
            className: "bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex items-center justify-between gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Pay 50% Deposit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  formatBudget(job.budget / 2n),
                  " to secure the worker"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "job_detail.pay_deposit.primary_button",
                  size: "sm",
                  className: "btn-secondary text-xs flex-shrink-0",
                  onClick: handlePayDeposit,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3.5 w-3.5 mr-1" }),
                    "Pay Now"
                  ]
                }
              )
            ]
          }
        ),
        isHomeowner && hasDeposit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Deposit paid — worker is confirmed" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "messages", "data-ocid": "job_detail.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "w-full mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            "data-ocid": "job_detail.messages.tab",
            value: "messages",
            className: "flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 mr-1.5" }),
              "Messages",
              messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "ml-1.5 h-4 text-[10px] px-1.5 leading-none",
                  children: messages.length
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "messages", children: !myPrincipal ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "job_detail.messages.auth_required",
            className: "text-center py-12 bg-card rounded-xl border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Login to view messages" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You must be logged in to participate in this conversation." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-80 overflow-y-auto p-4 space-y-1", children: [
            msgsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["m1", "m2", "m3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: "h-10 w-3/4 rounded-2xl"
              },
              k
            )) }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "job_detail.messages.empty_state",
                className: "flex flex-col items-center justify-center h-full text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-10 w-10 text-muted-foreground mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No messages yet. Start the conversation!" })
                ]
              }
            ) : messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageBubble,
              {
                message: msg,
                isMine: msg.senderPrincipal.toText() === myPrincipal
              },
              msg.id.toString()
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "messages.text.input",
                placeholder: "Type a message...",
                value: msgText,
                onChange: (e) => setMsgText(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                },
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "messages.send.primary_button",
                size: "icon",
                className: "btn-primary flex-shrink-0 h-9 w-9",
                onClick: handleSendMessage,
                disabled: sendMessage.isPending || !msgText.trim(),
                "aria-label": "Send message",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  JobDetailPage as default
};
