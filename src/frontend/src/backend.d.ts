import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Job {
    id: JobId;
    status: JobStatus;
    workType: WorkType;
    title: string;
    imageUrls: Array<ExternalBlob>;
    timelineDays: bigint;
    createdAt: Timestamp;
    assignedWorker?: UserId;
    description: string;
    requiredMaterials?: string;
    budget: bigint;
    posterPrincipal: UserId;
    location: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ReviewId = bigint;
export interface Review {
    id: ReviewId;
    createdAt: Timestamp;
    jobId: JobId;
    comment: string;
    reviewerPrincipal: UserId;
    rating: bigint;
    revieweePrincipal: UserId;
}
export type JobId = bigint;
export interface Payment {
    id: PaymentId;
    status: PaymentStatus;
    homeownerPrincipal: UserId;
    createdAt: Timestamp;
    jobId: JobId;
    amountPaid: bigint;
    paymentType: PaymentType;
    stripeSessionId: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export type PaymentId = bigint;
export type NotificationId = bigint;
export interface Notification {
    id: NotificationId;
    createdAt: Timestamp;
    read: boolean;
    relatedJobId?: JobId;
    messageText: string;
    userPrincipal: UserId;
}
export interface Message {
    id: MessageId;
    content: string;
    createdAt: Timestamp;
    jobId: JobId;
    senderPrincipal: UserId;
}
export type MessageId = bigint;
export interface UserProfile {
    id: UserId;
    yearsExperience?: bigint;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    averageRating?: number;
    maidCategory?: string;
    phone: string;
    completedJobsCount?: bigint;
    skills?: Array<string>;
    location: string;
}
export enum JobStatus {
    assigned = "assigned",
    cancelled = "cancelled",
    open = "open",
    completed = "completed"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid"
}
export enum PaymentType {
    completion = "completion",
    deposit = "deposit"
}
export enum UserRole {
    laborer = "laborer",
    maid = "maid",
    homeowner = "homeowner"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum WorkType {
    other = "other",
    cook = "cook",
    houseCleaner = "houseCleaner",
    plumbing = "plumbing",
    painting = "painting",
    general = "general",
    electrical = "electrical",
    babysitter = "babysitter",
    maidServices = "maidServices",
    childcare = "childcare",
    laundry = "laundry",
    carpentry = "carpentry",
    masonry = "masonry"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    assignWorker(jobId: bigint, workerPrincipal: Principal): Promise<void>;
    cancelJob(jobId: bigint): Promise<void>;
    completeJob(jobId: bigint): Promise<void>;
    confirmPayment(stripeSessionId: string): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createReview(revieweePrincipal: Principal, jobId: bigint, rating: bigint, comment: string): Promise<Review>;
    createUserProfile(name: string, phone: string, location: string, role: UserRole): Promise<UserProfile>;
    filterJobs(location: string | null, workType: WorkType | null, maxBudget: bigint | null): Promise<Array<Job>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getJob(jobId: bigint): Promise<Job | null>;
    getMessagesForJob(jobId: bigint): Promise<Array<Message>>;
    getMyNotifications(): Promise<Array<Notification>>;
    getMyPostedJobs(): Promise<Array<Job>>;
    getPaymentsForJob(jobId: bigint): Promise<Array<Payment>>;
    getPlatformStats(): Promise<{
        totalCompletedJobs: bigint;
        totalWorkers: bigint;
        totalJobs: bigint;
    }>;
    getReviewsForJob(jobId: bigint): Promise<Array<Review>>;
    getReviewsForUser(userId: Principal): Promise<Array<Review>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(userId: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listJobs(): Promise<Array<Job>>;
    listMaids(): Promise<Array<UserProfile>>;
    listWorkers(): Promise<Array<UserProfile>>;
    markAllNotificationsRead(): Promise<void>;
    markNotificationRead(notificationId: bigint): Promise<void>;
    postJob(title: string, description: string, workType: WorkType, location: string, budget: bigint, timelineDays: bigint, requiredMaterials: string | null, imageUrls: Array<ExternalBlob>): Promise<Job>;
    recordPayment(jobId: bigint, amountPaid: bigint, paymentType: PaymentType, stripeSessionId: string): Promise<Payment>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendMessage(jobId: bigint, content: string): Promise<Message>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateUserProfile(name: string, phone: string, location: string): Promise<void>;
}
