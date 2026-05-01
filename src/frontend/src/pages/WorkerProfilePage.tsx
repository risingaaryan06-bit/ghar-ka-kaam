import { createActor } from "@/backend";
import { PageLoader } from "@/components/LoadingSpinner";
import { RateWorkerModal } from "@/components/RateWorkerModal";
import { RatingDisplay } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WORK_TYPE_META } from "@/types";
import type { WorkType } from "@/types";
import type { Job, UserProfile } from "@/types";
import { JobStatus, UserRole } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Clock,
  HardHat,
  MapPin,
  MessageSquare,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";

function memberSince(timestamp: bigint): string {
  const d = new Date(Number(timestamp) / 1_000_000);
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

// Maid category display helpers
const MAID_CATEGORY_META: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  cook: { label: "Cook", icon: "👩‍🍳", color: "bg-rose-100 text-rose-700" },
  houseCleaner: {
    label: "House Cleaner",
    icon: "🧹",
    color: "bg-purple-100 text-purple-700",
  },
  laundry: {
    label: "Laundry",
    icon: "👕",
    color: "bg-indigo-100 text-indigo-700",
  },
  childcare: {
    label: "Childcare",
    icon: "👶",
    color: "bg-green-100 text-green-700",
  },
  babysitter: {
    label: "Babysitter",
    icon: "🍼",
    color: "bg-teal-100 text-teal-700",
  },
  maidServices: {
    label: "Maid Services",
    icon: "🏠",
    color: "bg-pink-100 text-pink-700",
  },
};

export default function WorkerProfilePage() {
  const { workerId } = useParams({ from: "/workers/$workerId" });
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const [rateOpen, setRateOpen] = useState(false);

  let principalId: Principal | null = null;
  try {
    principalId = Principal.fromText(workerId);
  } catch {
    // invalid principal — will show not-found
  }

  const { data: profile, isLoading: profileLoading } =
    useQuery<UserProfile | null>({
      queryKey: ["worker", workerId],
      queryFn: async () => {
        if (!actor || !principalId) return null;
        return actor.getUserProfile(principalId);
      },
      enabled: !!actor && !isFetching && !!principalId,
    });

  const { data: callerProfile } = useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor || !identity) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  const { data: myJobs = [] } = useQuery<Job[]>({
    queryKey: ["myPostedJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPostedJobs();
    },
    enabled:
      !!actor &&
      !isFetching &&
      !!identity &&
      callerProfile?.role === UserRole.homeowner,
  });

  if (profileLoading) return <PageLoader label="Loading profile..." />;

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <HardHat className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Profile Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          This profile doesn't exist or has been removed.
        </p>
        <Link to="/workers">
          <Button data-ocid="worker_profile.back.button" variant="outline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Workers
          </Button>
        </Link>
      </div>
    );
  }

  const isMaid = profile.role === UserRole.maid;
  const skills = profile.skills ?? [];
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Maid category display
  const maidCat = profile.maidCategory
    ? (MAID_CATEGORY_META[profile.maidCategory] ?? {
        label: profile.maidCategory,
        icon: "✨",
        color: "bg-pink-100 text-pink-700",
      })
    : null;

  const workerCompletedJobs = myJobs.filter(
    (j) =>
      j.status === JobStatus.completed &&
      principalId &&
      j.assignedWorker?.toText() === principalId.toText(),
  );

  // Pick a completed job for the review, or fall back to a default
  const reviewJobId =
    workerCompletedJobs.length > 0 ? workerCompletedJobs[0].id : BigInt(1);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb nav */}
      <div className="bg-card border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <Link to="/workers">
            <Button
              data-ocid="worker_profile.back.button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Workers
            </Button>
          </Link>
          {isMaid && (
            <Badge
              data-ocid="worker_profile.maid_badge"
              className="bg-rose-100 text-rose-700 border-0 text-xs font-semibold"
            >
              <Sparkles className="h-3 w-3 mr-1" /> Maid Service Provider
            </Badge>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile hero card */}
        <Card
          className={`card-elevated border-t-4 mb-5 ${isMaid ? "border-t-rose-400" : "border-t-primary"}`}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 h-20 w-20 rounded-full flex items-center justify-center font-display font-bold text-2xl text-primary-foreground shadow-md ${isMaid ? "bg-gradient-to-br from-rose-400 to-pink-500" : "construction-gradient"}`}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
                    {profile.name}
                  </h1>
                  {isMaid && (
                    <Badge className="bg-rose-100 text-rose-700 border-0 text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Maid Service Provider
                    </Badge>
                  )}
                </div>
                <RatingDisplay
                  rating={profile.averageRating}
                  count={0}
                  size="md"
                  className="mt-1"
                />
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-secondary flex-shrink-0" />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5 text-secondary flex-shrink-0" />
                    Member since {memberSince(profile.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Maid service category badge */}
            {isMaid && maidCat && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-rose-200 bg-rose-50">
                  <span className="text-xl">{maidCat.icon}</span>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Service Category
                    </p>
                    <p className="text-sm font-bold text-foreground leading-tight">
                      {maidCat.label}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats bar */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="text-center py-3 bg-muted/40 rounded-lg">
                <div className="text-xl font-display font-bold text-foreground">
                  {Number(profile.completedJobsCount ?? 0)}
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5">
                  <Briefcase className="h-3 w-3" />
                  Jobs Done
                </div>
              </div>
              <div className="text-center py-3 bg-muted/40 rounded-lg">
                <div className="text-xl font-display font-bold text-foreground">
                  {profile.averageRating !== undefined
                    ? profile.averageRating.toFixed(1)
                    : "—"}
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5">
                  <Star className="h-3 w-3" /> Avg Rating
                </div>
              </div>
              <div className="text-center py-3 bg-muted/40 rounded-lg">
                <div className="text-xl font-display font-bold text-foreground">
                  {Number(profile.yearsExperience ?? 0)}
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5">
                  <Clock className="h-3 w-3" /> Yrs Exp
                </div>
              </div>
            </div>

            {/* Skills — only for laborers */}
            {!isMaid && skills.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Skills & Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => {
                    const meta = WORK_TYPE_META[s] ?? {
                      label: s,
                      icon: "🛠️",
                      color: "bg-muted text-muted-foreground",
                    };
                    return (
                      <Badge
                        key={s}
                        variant="outline"
                        className={`text-sm border-0 ${meta.color}`}
                      >
                        {meta.icon} {meta.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Maid services list */}
            {isMaid && skills.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Services Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => {
                    const meta = WORK_TYPE_META[s] ?? {
                      label: s,
                      icon: "✨",
                      color: "bg-rose-100 text-rose-700",
                    };
                    return (
                      <Badge
                        key={s}
                        variant="outline"
                        className={`text-sm border-0 ${meta.color}`}
                      >
                        {meta.icon} {meta.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            <Separator className="mt-5 mb-4" />

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {isMaid ? (
                <Link to="/maids" className="flex-1">
                  <Button
                    data-ocid="worker_profile.hire.primary_button"
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold"
                    size="lg"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Hire This Maid
                  </Button>
                </Link>
              ) : (
                <Link to="/post-job" className="flex-1">
                  <Button
                    data-ocid="worker_profile.hire.primary_button"
                    className="btn-primary w-full"
                    size="lg"
                  >
                    <HardHat className="h-5 w-5 mr-2" />
                    Hire This Worker
                  </Button>
                </Link>
              )}
              {/* Rate This Worker button */}
              <Button
                data-ocid="worker_profile.rate.open_modal_button"
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60"
                onClick={() => setRateOpen(true)}
              >
                <Star className="h-5 w-5 mr-2 fill-primary text-primary" />
                Rate
              </Button>
              <Link to="/dashboard" className="flex-1 sm:flex-none">
                <Button
                  data-ocid="worker_profile.message.button"
                  variant="outline"
                  size="lg"
                  className="w-full border-primary/40 text-primary hover:bg-primary/5"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Message
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Completed Jobs section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-wide">
              Completed Jobs ({workerCompletedJobs.length})
            </h2>
          </div>

          {workerCompletedJobs.length === 0 ? (
            <div
              data-ocid="worker_profile.jobs.empty_state"
              className="text-center py-14 bg-card rounded-xl border border-border"
            >
              <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="font-display font-semibold text-foreground mb-1">
                No completed jobs
              </p>
              <p className="text-sm text-muted-foreground">
                Jobs completed with this{" "}
                {isMaid ? "service provider" : "worker"} will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {workerCompletedJobs.map((job, idx) => {
                const meta = WORK_TYPE_META[job.workType as WorkType] ?? {
                  label: job.workType,
                  icon: "🛠️",
                  color: "bg-muted text-muted-foreground",
                };
                return (
                  <Card
                    key={job.id.toString()}
                    data-ocid={`worker_profile.job.item.${idx + 1}`}
                    className="card-elevated"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            to="/jobs/$jobId"
                            params={{ jobId: job.id.toString() }}
                            className="font-display font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {job.title}
                          </Link>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-[11px] border-0 ${meta.color}`}
                            >
                              {meta.icon} {meta.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[11px] bg-primary/15 text-primary border-0 flex-shrink-0"
                        >
                          ✓ Completed
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Rate Worker Modal */}
      <RateWorkerModal
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        workerPrincipal={workerId}
        workerName={profile.name}
        jobId={reviewJobId}
      />
    </div>
  );
}
