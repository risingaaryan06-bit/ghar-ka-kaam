import { PageLoader } from "@/components/LoadingSpinner";
import { RatingDisplay } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetCallerProfile,
  useGetJob,
  useGetMessagesForJob,
  useGetPaymentsForJob,
  useGetUserProfile,
  useSendMessage,
} from "@/hooks/useQueries";
import {
  JobStatus,
  PaymentType,
  WORK_TYPE_META,
  formatBudget,
  timeAgo,
} from "@/types";
import type { Message, WorkType } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  MessageCircle,
  Send,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Message bubble ──────────────────────────────────────────────────────────

function MessageBubble({
  message,
  isMine,
}: {
  message: Message;
  isMine: boolean;
}) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${
          isMine
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border rounded-tl-sm"
        }`}
      >
        <p className="leading-relaxed">{message.content}</p>
        <p
          className={`text-[10px] mt-1 ${isMine ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {timeAgo(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

// ─── Assigned worker card ─────────────────────────────────────────────────────

function AssignedWorkerBanner({ workerId }: { workerId: string }) {
  const { data: profile } = useGetUserProfile(workerId);
  if (!profile) return null;
  return (
    <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-3 mb-4">
      <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <User className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-primary font-semibold uppercase tracking-wide">
          Assigned Worker
        </p>
        <p className="font-display font-bold text-foreground text-sm truncate">
          {profile.name}
        </p>
        {profile.location && (
          <p className="text-xs text-muted-foreground truncate">
            <MapPin className="inline h-3 w-3 mr-0.5" />
            {profile.location}
          </p>
        )}
      </div>
      {profile.averageRating !== undefined && (
        <div className="ml-auto flex-shrink-0">
          <RatingDisplay rating={profile.averageRating} size="sm" />
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function JobDetailPage() {
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  const { identity } = useInternetIdentity();
  const myPrincipal = identity?.getPrincipal().toText();

  const jobIdBigInt = BigInt(jobId);

  const { data: job, isLoading } = useGetJob(jobIdBigInt);
  const { data: messages = [], isLoading: msgsLoading } =
    useGetMessagesForJob(jobIdBigInt);
  const { data: payments = [] } = useGetPaymentsForJob(jobIdBigInt);
  useGetCallerProfile();

  const sendMessage = useSendMessage();

  const [msgText, setMsgText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (isLoading) return <PageLoader label="Loading job details..." />;

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Briefcase className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-display font-bold text-xl mb-2">Job not found</h2>
        <p className="text-muted-foreground text-sm mb-4">
          This job may have been removed.
        </p>
        <Link to="/jobs">
          <Button
            data-ocid="job_detail.back_not_found.button"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
      </div>
    );
  }

  const meta = WORK_TYPE_META[job.workType as WorkType] ?? WORK_TYPE_META.other;
  const isHomeowner =
    myPrincipal !== undefined && job.posterPrincipal.toText() === myPrincipal;
  const hasDeposit = payments.some(
    (p) => p.paymentType === PaymentType.deposit,
  );

  const handleSendMessage = () => {
    const content = msgText.trim();
    if (!content) return;
    sendMessage.mutate(
      { jobId: jobIdBigInt, content },
      {
        onSuccess: () => setMsgText(""),
        onError: (e) =>
          toast.error(
            e instanceof Error ? e.message : "Failed to send message",
          ),
      },
    );
  };

  const handlePayDeposit = () => {
    toast.info(
      "Payment gateway integration requires Stripe configuration. Contact the admin.",
    );
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Back bar */}
      <div className="bg-card border-b border-border py-3">
        <div className="container mx-auto px-4">
          <Link to="/jobs">
            <Button
              data-ocid="job_detail.back.button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Job header card */}
        <Card className="card-elevated border-l-4 border-l-primary mb-5">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {meta.icon}
                </div>
                <div className="min-w-0">
                  <h1 className="font-display font-bold text-xl text-foreground leading-snug">
                    {job.title}
                  </h1>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta.color}`}
                  >
                    {meta.label}
                  </span>
                </div>
              </div>
              <Badge
                variant={
                  job.status === JobStatus.open
                    ? "default"
                    : job.status === JobStatus.assigned
                      ? "secondary"
                      : job.status === JobStatus.completed
                        ? "outline"
                        : "destructive"
                }
                className="flex-shrink-0"
              >
                {job.status === JobStatus.open
                  ? "Open"
                  : job.status === JobStatus.assigned
                    ? "Assigned"
                    : job.status === JobStatus.completed
                      ? "Completed"
                      : "Cancelled"}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {job.description}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">Budget</p>
                <p className="font-display font-bold text-foreground text-sm">
                  {formatBudget(job.budget)}
                </p>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">Duration</p>
                <p className="font-display font-bold text-foreground text-sm flex items-center justify-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-secondary" />
                  {Number(job.timelineDays)}d
                </p>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                <p className="font-display font-bold text-foreground text-sm truncate flex items-center justify-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-secondary flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </p>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">Posted</p>
                <p className="font-display font-bold text-foreground text-sm flex items-center justify-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-secondary" />
                  {timeAgo(job.createdAt)}
                </p>
              </div>
            </div>

            {/* Materials */}
            {job.requiredMaterials && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm mb-4">
                <span className="font-semibold text-foreground">
                  Required Materials:{" "}
                </span>
                <span className="text-muted-foreground">
                  {job.requiredMaterials}
                </span>
              </div>
            )}

            {/* Job images */}
            {job.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {job.imageUrls.map((img, i) => (
                  <img
                    key={img.getDirectURL()}
                    src={img.getDirectURL()}
                    alt={`Work site view ${i + 1} of ${job.imageUrls.length}`}
                    className="h-20 w-20 rounded-lg object-cover border border-border"
                  />
                ))}
              </div>
            )}

            {/* Assigned worker */}
            {job.assignedWorker && (
              <AssignedWorkerBanner workerId={job.assignedWorker.toText()} />
            )}

            {/* Payment section for homeowner */}
            {isHomeowner &&
              job.status === JobStatus.assigned &&
              !hasDeposit && (
                <div
                  data-ocid="job_detail.payment.section"
                  className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      Pay 50% Deposit
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatBudget(job.budget / 2n)} to secure the worker
                    </p>
                  </div>
                  <Button
                    data-ocid="job_detail.pay_deposit.primary_button"
                    size="sm"
                    className="btn-secondary text-xs flex-shrink-0"
                    onClick={handlePayDeposit}
                  >
                    <CreditCard className="h-3.5 w-3.5 mr-1" />
                    Pay Now
                  </Button>
                </div>
              )}

            {isHomeowner && hasDeposit && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">
                  Deposit paid — worker is confirmed
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Messages */}
        <Tabs defaultValue="messages" data-ocid="job_detail.tabs">
          <TabsList className="w-full mb-4">
            <TabsTrigger
              data-ocid="job_detail.messages.tab"
              value="messages"
              className="flex-1"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" />
              Messages
              {messages.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1.5 h-4 text-[10px] px-1.5 leading-none"
                >
                  {messages.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            {!myPrincipal ? (
              <div
                data-ocid="job_detail.messages.auth_required"
                className="text-center py-12 bg-card rounded-xl border border-border"
              >
                <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-semibold text-foreground mb-1">
                  Login to view messages
                </p>
                <p className="text-sm text-muted-foreground">
                  You must be logged in to participate in this conversation.
                </p>
              </div>
            ) : (
              <Card className="card-elevated">
                <CardContent className="p-0">
                  <div className="h-80 overflow-y-auto p-4 space-y-1">
                    {msgsLoading ? (
                      <div className="space-y-2">
                        {["m1", "m2", "m3"].map((k) => (
                          <Skeleton
                            key={k}
                            className="h-10 w-3/4 rounded-2xl"
                          />
                        ))}
                      </div>
                    ) : messages.length === 0 ? (
                      <div
                        data-ocid="job_detail.messages.empty_state"
                        className="flex flex-col items-center justify-center h-full text-center"
                      >
                        <MessageCircle className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No messages yet. Start the conversation!
                        </p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <MessageBubble
                          key={msg.id.toString()}
                          message={msg}
                          isMine={msg.senderPrincipal.toText() === myPrincipal}
                        />
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <Separator />

                  <div className="p-3 flex items-center gap-2">
                    <Input
                      data-ocid="messages.text.input"
                      placeholder="Type a message..."
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      data-ocid="messages.send.primary_button"
                      size="icon"
                      className="btn-primary flex-shrink-0 h-9 w-9"
                      onClick={handleSendMessage}
                      disabled={sendMessage.isPending || !msgText.trim()}
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
