import { createActor } from "@/backend";
import { JobCard } from "@/components/JobCard";
import { PageLoader } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetCallerProfile,
  useGetMyNotifications,
  useGetMyPostedJobs,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useSaveCallerUserProfile,
} from "@/hooks/useQueries";
import {
  JobStatus,
  PaymentStatus,
  PaymentType,
  UserRole,
  WORK_TYPE_META,
  formatBudget,
  timeAgo,
} from "@/types";
import type { Job, Notification, Payment, UserProfile } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Bell,
  BellOff,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock,
  HardHat,
  Home,
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Save,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Helpers ─────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function paymentTypeLabel(type: PaymentType): string {
  return type === PaymentType.deposit ? "Deposit" : "Final Payment";
}

function paymentStatusColor(status: PaymentStatus): string {
  return status === PaymentStatus.paid
    ? "bg-primary/12 text-primary border-primary/25 border"
    : "bg-secondary/10 text-secondary border-secondary/20 border";
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <Card
      className={`bg-card rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${
        accent
          ? "border-l-4 border-l-primary border-t border-r border-b border-border"
          : "border-border"
      }`}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-primary/12 flex items-center justify-center border border-primary/15">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-extrabold text-xl text-foreground leading-none">
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-1 truncate font-medium">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Notifications Panel ──────────────────────────────────────────────────────

function NotificationsPanel({
  notifications,
  isLoading,
}: {
  notifications: Notification[];
  isLoading: boolean;
}) {
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const unread = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {["n1", "n2", "n3"].map((k) => (
          <Skeleton key={k} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {unread > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground font-medium">
            {unread} unread notification{unread !== 1 ? "s" : ""}
          </span>
          <Button
            data-ocid="dashboard.notifications.mark_all_read.button"
            size="sm"
            variant="ghost"
            onClick={() =>
              markAllRead.mutate(undefined, {
                onSuccess: () =>
                  toast.success("All notifications marked as read"),
              })
            }
            disabled={markAllRead.isPending}
            className="text-xs text-primary hover:text-primary/80"
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Mark all read
          </Button>
        </div>
      )}

      {notifications.length === 0 ? (
        <div
          data-ocid="dashboard.notifications.empty_state"
          className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15"
        >
          <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4 text-2xl">
            🔔
          </div>
          <h3 className="font-display font-bold text-foreground mb-1">
            No Notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            You're all caught up! New activity will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif, idx) => (
            <motion.div
              key={notif.id.toString()}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Card
                data-ocid={`dashboard.notification.item.${idx + 1}`}
                className={`cursor-pointer rounded-xl transition-all duration-200 hover:shadow-md ${
                  !notif.read
                    ? "border-l-4 border-l-primary bg-primary/5 border-t border-r border-b border-border"
                    : "border-border hover:border-primary/20"
                }`}
                onClick={() => !notif.read && markRead.mutate(notif.id)}
              >
                <CardContent className="p-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center ${
                        !notif.read
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-foreground leading-snug">
                        {notif.messageText}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {timeAgo(notif.createdAt)}
                      </p>
                    </div>
                  </div>
                  {!notif.read && (
                    <Badge className="flex-shrink-0 text-xs bg-primary text-primary-foreground border-0 rounded-full">
                      New
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Profile Edit Form ────────────────────────────────────────────────────────

function ProfileEditSection({ profile }: { profile: UserProfile | null }) {
  const saveProfile = useSaveCallerUserProfile();
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    phone: profile?.phone ?? "",
    location: profile?.location ?? "",
    skills: profile?.skills?.join(", ") ?? "",
    yearsExperience: profile?.yearsExperience?.toString() ?? "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
        skills: profile.skills?.join(", ") ?? "",
        yearsExperience: profile.yearsExperience?.toString() ?? "",
      });
    }
  }, [profile]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    const updatedProfile: UserProfile = {
      ...profile,
      name: form.name.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      skills:
        profile.role === UserRole.laborer && form.skills.trim()
          ? form.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : profile.skills,
      yearsExperience:
        profile.role === UserRole.laborer && form.yearsExperience
          ? BigInt(form.yearsExperience)
          : profile.yearsExperience,
    };

    saveProfile.mutate(updatedProfile, {
      onSuccess: () => toast.success("Profile updated successfully!"),
      onError: () => toast.error("Failed to update profile. Please try again."),
    });
  }

  const isWorker = profile?.role === UserRole.laborer;
  const isMaid = profile?.role === UserRole.maid;
  const isWorkerOrMaid = isWorker || isMaid;
  const skillsFilledIn = profile?.skills && profile.skills.length > 0;
  const experienceFilledIn = profile?.yearsExperience !== undefined;
  const profileComplete =
    !isWorkerOrMaid || (skillsFilledIn && experienceFilledIn);

  if (!profile) {
    return (
      <div
        data-ocid="dashboard.profile.empty_state"
        className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15"
      >
        <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4 text-2xl">
          👤
        </div>
        <h3 className="font-display font-bold text-foreground mb-1">
          Profile Not Set Up
        </h3>
        <p className="text-sm text-muted-foreground">
          Please log in and create a profile to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-5">
      {isWorkerOrMaid && !profileComplete && (
        <Card className="border-l-4 border-l-secondary bg-secondary/5 border-t border-r border-b border-secondary/20 rounded-xl">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Complete your profile to get more jobs
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add your skills and experience to appear in search results.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isWorkerOrMaid && profileComplete && (
        <Card className="border-l-4 border-l-primary bg-primary/5 border-t border-r border-b border-primary/15 rounded-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm font-semibold text-foreground">
              Profile complete! You appear in search results.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="card-elevated rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar
              className="h-13 w-13 border-2 border-primary/25"
              style={{ height: "52px", width: "52px" }}
            >
              <AvatarFallback className="bg-gradient-to-br from-primary/25 to-primary/8 text-primary font-bold font-display text-lg">
                {initials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-display text-lg">
                {profile.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground capitalize flex items-center gap-1.5 mt-0.5">
                {profile.role === UserRole.homeowner ? (
                  <Home className="h-3 w-3 text-primary" />
                ) : profile.role === UserRole.maid ? (
                  <Sparkles className="h-3 w-3 text-primary" />
                ) : (
                  <HardHat className="h-3 w-3 text-primary" />
                )}
                <span className="capitalize">{profile.role}</span>
                {profile.averageRating !== undefined && (
                  <span className="flex items-center gap-0.5 ml-1">
                    <Star className="h-3 w-3 text-primary fill-primary" />
                    {profile.averageRating.toFixed(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="profile-name"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Full Name
                </Label>
                <Input
                  id="profile-name"
                  data-ocid="dashboard.profile.name.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  required
                  className="rounded-xl border-border focus:border-primary/50 h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="profile-phone"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Phone Number
                </Label>
                <Input
                  id="profile-phone"
                  data-ocid="dashboard.profile.phone.input"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="rounded-xl border-border focus:border-primary/50 h-10"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-location"
                className="text-xs font-semibold text-muted-foreground"
              >
                Location
              </Label>
              <Input
                id="profile-location"
                data-ocid="dashboard.profile.location.input"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="City, State"
                className="rounded-xl border-border focus:border-primary/50 h-10"
              />
            </div>

            {isWorkerOrMaid && (
              <>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="profile-skills"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Skills{" "}
                    <span className="text-muted-foreground/60 font-normal">
                      (comma-separated)
                    </span>
                  </Label>
                  <Textarea
                    id="profile-skills"
                    data-ocid="dashboard.profile.skills.textarea"
                    value={form.skills}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, skills: e.target.value }))
                    }
                    placeholder={
                      isMaid
                        ? "e.g. Cooking, Cleaning, Laundry"
                        : "e.g. Masonry, Tiling, Plastering"
                    }
                    rows={2}
                    className="resize-none rounded-xl border-border focus:border-primary/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="profile-experience"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Years of Experience
                  </Label>
                  <Input
                    id="profile-experience"
                    data-ocid="dashboard.profile.experience.input"
                    type="number"
                    min={0}
                    max={50}
                    value={form.yearsExperience}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        yearsExperience: e.target.value,
                      }))
                    }
                    placeholder="e.g. 5"
                    className="rounded-xl border-border focus:border-primary/50 h-10"
                  />
                </div>
              </>
            )}

            <Button
              data-ocid="dashboard.profile.save.submit_button"
              type="submit"
              className="btn-primary w-full sm:w-auto h-10"
              disabled={saveProfile.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {saveProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Homeowner View ────────────────────────────────────────────────────────────

function HomeownerDashboard({
  jobs,
  notifications,
  profile,
  notifsLoading,
}: {
  jobs: Job[];
  notifications: Notification[];
  profile: UserProfile | null;
  notifsLoading: boolean;
}) {
  const { actor, isFetching } = useActor(createActor);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [allPayments, setAllPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (!actor || isFetching || jobs.length === 0) return;
    Promise.all(jobs.map((j) => actor.getPaymentsForJob(j.id))).then(
      (results) => setAllPayments(results.flat()),
    );
  }, [actor, isFetching, jobs]);

  const activeJobs = jobs.filter(
    (j) => j.status === JobStatus.open || j.status === JobStatus.assigned,
  ).length;
  const completedJobs = jobs.filter(
    (j) => j.status === JobStatus.completed,
  ).length;
  const totalSpent = allPayments
    .filter((p) => p.status === PaymentStatus.paid)
    .reduce((acc, p) => acc + p.amountPaid, 0n);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-2xl p-6 overflow-hidden relative banner-gradient">
        <div
          className="absolute top-0 right-0 w-40 h-full opacity-15"
          style={{
            background:
              "radial-gradient(circle at 100% 50%, oklch(0.80 0.12 350) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">
              Welcome back
            </p>
            <h2 className="font-display font-extrabold text-xl text-white leading-tight">
              {profile?.name?.split(" ")[0] ?? "Homeowner"} 🏠
            </h2>
            <p className="text-white/55 text-sm mt-0.5">
              Manage your jobs and track progress.
            </p>
          </div>
          <Link to="/post-job">
            <Button
              data-ocid="dashboard.homeowner.post_job.primary_button"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold shadow-pink border-0 h-10"
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Post New Job
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={Briefcase}
          label="Active Jobs"
          value={activeJobs}
          accent
        />
        <StatCard icon={TrendingUp} label="Total Jobs" value={jobs.length} />
        <StatCard icon={CheckCircle2} label="Completed" value={completedJobs} />
        <StatCard
          icon={CircleDollarSign}
          label="Total Spent"
          value={formatBudget(totalSpent)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to="/post-job">
          <Button
            data-ocid="dashboard.homeowner.quick_post_job.button"
            variant="outline"
            size="sm"
            className="text-xs rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
          >
            <PlusCircle className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Post a Job
          </Button>
        </Link>
        <Link to="/workers">
          <Button
            data-ocid="dashboard.homeowner.browse_workers.button"
            variant="outline"
            size="sm"
            className="text-xs rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
          >
            <Users className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Browse Workers
          </Button>
        </Link>
        <Link to="/maids">
          <Button
            data-ocid="dashboard.homeowner.find_maids.button"
            variant="outline"
            size="sm"
            className="text-xs rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Find Maids
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="w-full sm:w-auto flex overflow-x-auto bg-muted/50 rounded-xl p-1">
          <TabsTrigger
            data-ocid="dashboard.homeowner.jobs.tab"
            value="jobs"
            className="flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <Briefcase className="h-3.5 w-3.5 mr-1.5" />
            My Jobs
          </TabsTrigger>
          <TabsTrigger
            data-ocid="dashboard.homeowner.notifications.tab"
            value="notifications"
            className="flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <Bell className="h-3.5 w-3.5 mr-1.5" />
            Alerts
            {unreadCount > 0 && (
              <span className="ml-1.5 bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 leading-4 font-bold">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            data-ocid="dashboard.homeowner.payments.tab"
            value="payments"
            className="flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <CircleDollarSign className="h-3.5 w-3.5 mr-1.5" />
            Payments
          </TabsTrigger>
          <TabsTrigger
            data-ocid="dashboard.homeowner.profile.tab"
            value="profile"
            className="flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <User className="h-3.5 w-3.5 mr-1.5" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-5">
          {jobs.length === 0 ? (
            <div
              data-ocid="dashboard.homeowner.jobs.empty_state"
              className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                📋
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">
                No Jobs Posted Yet
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Post your first job to start finding skilled workers.
              </p>
              <Link to="/post-job">
                <Button
                  data-ocid="dashboard.homeowner.first_job.primary_button"
                  className="btn-primary"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post a Job
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job, idx) => (
                <JobCard key={job.id.toString()} job={job} index={idx + 1} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <NotificationsPanel
            notifications={notifications}
            isLoading={notifsLoading}
          />
        </TabsContent>

        <TabsContent value="payments" className="mt-5">
          {allPayments.length === 0 ? (
            <div
              data-ocid="dashboard.homeowner.payments.empty_state"
              className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                💳
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">
                No Payments Yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Payment history will appear here once you start hiring workers.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {allPayments.map((payment, idx) => (
                <Card
                  key={payment.id.toString()}
                  data-ocid={`dashboard.payment.item.${idx + 1}`}
                  className="card-elevated rounded-xl"
                >
                  <CardContent className="p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/12 flex items-center justify-center border border-primary/15">
                        <CircleDollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-foreground text-sm">
                          {formatBudget(payment.amountPaid)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {paymentTypeLabel(payment.paymentType)} · Job #
                          {payment.jobId.toString()} ·{" "}
                          {timeAgo(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold rounded-full px-3 py-1 flex-shrink-0 ${paymentStatusColor(payment.status)}`}
                    >
                      {payment.status === PaymentStatus.paid
                        ? "Paid"
                        : "Pending"}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          <ProfileEditSection profile={profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Worker / Maid View ────────────────────────────────────────────────────────

function WorkerDashboard({
  jobs,
  notifications,
  profile,
  notifsLoading,
  jobsLoading,
}: {
  jobs: Job[];
  notifications: Notification[];
  profile: UserProfile | null;
  notifsLoading: boolean;
  jobsLoading: boolean;
}) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isMaid = profile?.role === UserRole.maid;

  const activeJobs = jobs.filter(
    (j) => j.status === JobStatus.assigned || j.status === JobStatus.open,
  ).length;
  const completedJobs = profile?.completedJobsCount
    ? Number(profile.completedJobsCount)
    : 0;

  const hasSkills = profile?.skills && profile.skills.length > 0;
  const hasExperience = profile?.yearsExperience !== undefined;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-2xl p-6 overflow-hidden relative banner-gradient">
        <div
          className="absolute top-0 right-0 w-40 h-full opacity-15"
          style={{
            background:
              "radial-gradient(circle at 100% 50%, oklch(0.80 0.12 350) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">
              Welcome
            </p>
            <h2 className="font-display font-extrabold text-xl text-white leading-tight">
              {profile?.name?.split(" ")[0] ?? "Worker"} {isMaid ? "✨" : "👷"}
            </h2>
            <p className="text-white/55 text-sm mt-0.5">
              {isMaid
                ? "Track your household service jobs."
                : "Track your construction jobs and grow your reputation."}
            </p>
          </div>
          <Link to={isMaid ? "/maids" : "/jobs"}>
            <Button
              data-ocid="dashboard.worker.find_work.primary_button"
              size="sm"
              className="btn-primary shadow-pink h-10"
            >
              <Briefcase className="h-4 w-4 mr-1.5" />
              {isMaid ? "Browse Maid Jobs" : "Find Jobs"}
            </Button>
          </Link>
        </div>
      </div>

      {(!hasSkills || !hasExperience) && (
        <Card className="border-l-4 border-l-secondary bg-secondary/5 border-t border-r border-b border-secondary/15 rounded-xl">
          <CardContent className="p-4 flex items-start gap-3">
            <Wrench className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Complete your profile to attract more homeowners
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {!hasSkills && "Add your skills. "}
                {!hasExperience && "Add years of experience."}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard icon={Clock} label="Active Jobs" value={activeJobs} accent />
        <StatCard icon={CheckCircle2} label="Completed" value={completedJobs} />
        <StatCard
          icon={MapPin}
          label="Location"
          value={profile?.location ?? "—"}
        />
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="w-full sm:w-auto flex overflow-x-auto bg-muted/50 rounded-xl p-1">
          <TabsTrigger
            data-ocid="dashboard.worker.jobs.tab"
            value="jobs"
            className="flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <Briefcase className="h-3.5 w-3.5 mr-1.5" />
            My Jobs
          </TabsTrigger>
          <TabsTrigger
            data-ocid="dashboard.worker.notifications.tab"
            value="notifications"
            className="flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <Bell className="h-3.5 w-3.5 mr-1.5" />
            Alerts
            {unreadCount > 0 && (
              <span className="ml-1.5 bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 leading-4 font-bold">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            data-ocid="dashboard.worker.profile.tab"
            value="profile"
            className="flex-1 sm:flex-none rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <User className="h-3.5 w-3.5 mr-1.5" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-5">
          {jobsLoading ? (
            <div className="space-y-3">
              {["j1", "j2", "j3"].map((k) => (
                <Skeleton key={k} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div
              data-ocid="dashboard.worker.jobs.empty_state"
              className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border-2 border-dashed border-primary/15"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                💼
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">
                No Active Jobs
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Browse open jobs and contact homeowners to get hired.
              </p>
              <Link to="/jobs">
                <Button
                  data-ocid="dashboard.worker.first_job.primary_button"
                  className="btn-primary"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job.id.toString()}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    data-ocid={`dashboard.worker.job.item.${idx + 1}`}
                    className="card-elevated rounded-xl"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/12 flex items-center justify-center text-xl border border-primary/15">
                          {WORK_TYPE_META[job.workType]?.icon ?? "🛠️"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-bold text-foreground text-sm truncate">
                            {job.title}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 text-primary" />
                            {job.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatBudget(job.budget)} ·{" "}
                            {Number(job.timelineDays)} days
                          </p>
                        </div>
                        <Badge
                          variant={
                            job.status === JobStatus.assigned
                              ? "default"
                              : "outline"
                          }
                          className="text-xs capitalize flex-shrink-0"
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <NotificationsPanel
            notifications={notifications}
            isLoading={notifsLoading}
          />
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          <ProfileEditSection profile={profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Main DashboardPage ────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { isAuthenticated } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCallerProfile();
  const { data: postedJobs = [], isLoading: jobsLoading } =
    useGetMyPostedJobs();
  const { data: notifications = [], isLoading: notifsLoading } =
    useGetMyNotifications();
  const qc = useQueryClient();

  void qc;

  const isLoading = profileLoading || jobsLoading;

  if (!isAuthenticated || isLoading) {
    return <PageLoader label="Loading your dashboard..." />;
  }

  const isWorkerOrMaid =
    profile?.role === UserRole.laborer || profile?.role === UserRole.maid;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-card border-b-2 border-primary/10 py-6 shadow-subtle">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl construction-gradient flex items-center justify-center shadow-pink">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl text-foreground leading-tight">
                {isWorkerOrMaid ? "My Dashboard" : "Homeowner Dashboard"}
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                {profile?.name && (
                  <>
                    <span className="font-medium">{profile.name}</span>
                    <span className="text-border">·</span>
                  </>
                )}
                <span className="capitalize">{profile?.role ?? "..."}</span>
                {unreadCount > 0 && (
                  <>
                    <span className="text-border">·</span>
                    <span className="flex items-center gap-0.5 text-primary font-bold">
                      <Bell className="h-3 w-3" />
                      {unreadCount} new
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
          {!isWorkerOrMaid && (
            <Link to="/post-job">
              <Button
                data-ocid="dashboard.header.post_job.primary_button"
                className="btn-primary h-10"
                size="sm"
              >
                <PlusCircle className="h-4 w-4 mr-1.5" />
                Post Job
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isWorkerOrMaid ? (
            <WorkerDashboard
              jobs={postedJobs}
              notifications={notifications}
              profile={profile ?? null}
              notifsLoading={notifsLoading}
              jobsLoading={jobsLoading}
            />
          ) : (
            <HomeownerDashboard
              jobs={postedJobs}
              notifications={notifications}
              profile={profile ?? null}
              notifsLoading={notifsLoading}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
