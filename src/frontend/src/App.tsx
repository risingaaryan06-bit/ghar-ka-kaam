import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const JobsPage = lazy(() => import("@/pages/JobsPage"));
const JobDetailPage = lazy(() => import("@/pages/JobDetailPage"));
const PostJobPage = lazy(() => import("@/pages/PostJobPage"));
const WorkersPage = lazy(() => import("@/pages/WorkersPage"));
const WorkerProfilePage = lazy(() => import("@/pages/WorkerProfilePage"));
const MaidsPage = lazy(() => import("@/pages/MaidsPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const MarketplacePage = lazy(() => import("@/pages/MarketplacePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));

// Root route with Layout wrapper
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  component: JobsPage,
});

const jobDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs/$jobId",
  component: JobDetailPage,
});

const workersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workers",
  component: WorkersPage,
});

const workerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workers/$workerId",
  component: WorkerProfilePage,
});

const maidsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maids",
  component: MaidsPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/marketplace",
  component: MarketplacePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

// Protected routes
const postJobRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post-job",
  component: () => (
    <ProtectedRoute>
      <PostJobPage />
    </ProtectedRoute>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signupRoute,
  jobsRoute,
  jobDetailRoute,
  workersRoute,
  workerProfileRoute,
  maidsRoute,
  marketplaceRoute,
  aboutRoute,
  contactRoute,
  postJobRoute,
  dashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
