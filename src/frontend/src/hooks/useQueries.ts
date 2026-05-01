import { createActor } from "@/backend";
import type {
  Job,
  Message,
  Notification,
  Payment,
  Review,
  UserProfile,
  WorkType,
} from "@/types";
import { UserRole } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const _now = BigInt(Date.now()) * BigInt(1_000_000);

function _makePrincipal(id: string): Principal {
  return { toText: () => id } as unknown as Principal;
}

// ─── Hardcoded public profiles ────────────────────────────────────────────────
// These are returned immediately so profiles show WITHOUT any login or actor.

const STATIC_WORKERS: UserProfile[] = [
  {
    id: _makePrincipal("worker-hira-singh"),
    name: "Hira Singh",
    phone: "+91 80917 72338",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(8),
    averageRating: 4.8,
    completedJobsCount: BigInt(95),
    skills: ["Pipe Fitting", "Leak Repair", "Installation"],
  },
  {
    id: _makePrincipal("worker-chintu"),
    name: "Chintu",
    phone: "+91 78762 51663",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(5),
    averageRating: 4.5,
    completedJobsCount: BigInt(67),
    skills: ["Pipe Fitting", "Drainage", "Repair"],
  },
  {
    id: _makePrincipal("worker-lucky"),
    name: "Lucky",
    phone: "+91 82196 96946",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(120),
    skills: ["Furniture Making", "Wood Work", "Repair"],
  },
  {
    id: _makePrincipal("worker-raju-mistri"),
    name: "Raju Mistri",
    phone: "+91 98765 43210",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(10),
    averageRating: 4.7,
    completedJobsCount: BigInt(43),
    skills: ["Masonry", "Construction", "Repair"],
  },
  {
    id: _makePrincipal("worker-suresh-painter"),
    name: "Suresh Painter",
    phone: "+91 97654 32109",
    location: "Mumbai",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(7),
    averageRating: 4.6,
    completedJobsCount: BigInt(82),
    skills: ["Interior Painting", "Exterior Painting", "Wall Finishing"],
  },
  {
    id: _makePrincipal("worker-mohan-kumar"),
    name: "Mohan Kumar",
    phone: "+91 96543 21098",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(4),
    averageRating: 4.3,
    completedJobsCount: BigInt(38),
    skills: ["Painting", "Whitewash", "Texture Work"],
  },
  {
    id: _makePrincipal("worker-arvind-electrician"),
    name: "Arvind Electrician",
    phone: "+91 95432 10987",
    location: "Noida",
    role: UserRole.laborer,
    createdAt: _now,
    yearsExperience: BigInt(9),
    averageRating: 4.7,
    completedJobsCount: BigInt(55),
    skills: ["Wiring", "Panel Installation", "Repairs"],
  },
];

const STATIC_MAIDS: UserProfile[] = [
  {
    id: _makePrincipal("maid-sunita-devi"),
    name: "Sunita Devi",
    phone: "+91 91234 56789",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(5),
    averageRating: 4.7,
    completedJobsCount: BigInt(130),
    skills: ["House Cleaning", "Cooking", "Kitchen Cleaning"],
    maidCategory: "houseCleaner",
  },
  {
    id: _makePrincipal("maid-pooja-sharma"),
    name: "Pooja Sharma",
    phone: "+91 92345 67890",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(3),
    averageRating: 4.9,
    completedJobsCount: BigInt(60),
    skills: ["Babysitting", "Child Care", "Homework Help"],
    maidCategory: "babysitter",
  },
  {
    id: _makePrincipal("maid-meena-kumari"),
    name: "Meena Kumari",
    phone: "+91 93456 78901",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(180),
    skills: ["Full-time Maid", "House Cleaning", "Cooking", "Laundry"],
    maidCategory: "maidServices",
  },
  {
    id: _makePrincipal("maid-rekha-thakur"),
    name: "Rekha Thakur",
    phone: "+91 94567 89012",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: _now,
    yearsExperience: BigInt(4),
    averageRating: 4.6,
    completedJobsCount: BigInt(85),
    skills: ["Childcare", "House Cleaning", "Infant Care"],
    maidCategory: "childcare",
  },
];

// ─── Public hooks — return hardcoded data immediately, no actor needed ────────

export function useListWorkers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile[]>({
    queryKey: ["workers"],
    queryFn: async () => {
      // Try live backend first; fall back to hardcoded if unavailable
      if (actor && !isFetching) {
        try {
          const live = await actor.listWorkers();
          if (live && live.length > 0) return live;
        } catch {
          // actor unavailable — use static data below
        }
      }
      return STATIC_WORKERS;
    },
    // Always enabled — initialData ensures immediate render without loading flash
    enabled: true,
    initialData: STATIC_WORKERS,
  });
}

export function useListMaids() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile[]>({
    queryKey: ["maids"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const live = await actor.listMaids();
          if (live && live.length > 0) return live;
        } catch {
          // fall back
        }
      }
      return STATIC_MAIDS;
    },
    enabled: true,
    initialData: STATIC_MAIDS,
  });
}

// ─── Other hooks ──────────────────────────────────────────────────────────────

export function usePlatformStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor)
        return { totalJobs: 0n, totalWorkers: 0n, totalCompletedJobs: 0n };
      return actor.getPlatformStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFilterJobs(
  location: string | null,
  workType: WorkType | null,
  maxBudget: bigint | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["jobs", "filter", location, workType, maxBudget?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.filterJobs(location, workType, maxBudget);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetJob(jobId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job | null>({
    queryKey: ["job", jobId?.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return null;
      return actor.getJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
  });
}

export function useGetMyPostedJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["myJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPostedJobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserProfile(userId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getUserProfile(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetMessagesForJob(jobId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Message[]>({
    queryKey: ["messages", jobId?.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return [];
      return actor.getMessagesForJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
    refetchInterval: 10_000,
  });
}

export function useGetMyNotifications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyNotifications();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useGetReviewsForUser(userId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["reviews", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getReviewsForUser(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetReviewsForJob(jobId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["jobReviews", jobId?.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return [];
      return actor.getReviewsForJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
  });
}

export function useGetPaymentsForJob(jobId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Payment[]>({
    queryKey: ["payments", jobId?.toString()],
    queryFn: async () => {
      if (!actor || !jobId) return [];
      return actor.getPaymentsForJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
  });
}

export function useAssignWorker() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      jobId,
      workerPrincipal,
    }: {
      jobId: bigint;
      workerPrincipal: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.assignWorker(jobId, Principal.fromText(workerPrincipal));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
}

import type { ExternalBlob } from "@/backend";
import type { WorkType as WType } from "@/types";

export function usePostJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      workType: WType;
      location: string;
      budget: bigint;
      timelineDays: bigint;
      requiredMaterials: string | null;
      imageUrls: Array<ExternalBlob>;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.postJob(
        params.title,
        params.description,
        params.workType,
        params.location,
        params.budget,
        params.timelineDays,
        params.requiredMaterials,
        params.imageUrls,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
}

export function useCreateUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      location,
      role,
    }: {
      name: string;
      phone: string;
      location: string;
      role: import("@/types").UserRole;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createUserProfile(name, phone, location, role);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      location,
    }: {
      name: string;
      phone: string;
      location: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateUserProfile(name, phone, location);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function useSendMessage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      jobId,
      content,
    }: { jobId: bigint; content: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendMessage(jobId, content);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["messages", vars.jobId.toString()] });
    },
  });
}

export function useCreateReview() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      revieweePrincipal,
      jobId,
      rating,
      comment,
    }: {
      revieweePrincipal: string;
      jobId: bigint;
      rating: bigint;
      comment: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.createReview(
        Principal.fromText(revieweePrincipal),
        jobId,
        rating,
        comment,
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["jobReviews", vars.jobId.toString()] });
    },
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.markNotificationRead(notificationId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.markAllNotificationsRead();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: import("@/types").UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function useCompleteJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.completeJob(jobId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
}

export function useCancelJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelJob(jobId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
}
