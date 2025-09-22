import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Lazy-loaded route components
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Home = lazy(() => import('./components/Home'));
const Jobs = lazy(() => import('./components/Jobs'));
const Browse = lazy(() => import('./components/Browse'));
const Profile = lazy(() => import('./components/Profile'));
const JobDescription = lazy(() => import('./components/JobDescription'));
const Companies = lazy(() => import('./components/admin/Companies'));
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate'));
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'));
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'));
const PostJob = lazy(() => import('./components/admin/PostJob'));
const Applicants = lazy(() => import('./components/admin/Applicants'));
const AcceptedApplicationsTable = lazy(() => import('./components/admin/AcceptedApplicationsTable'));
const PaymentSuccess = lazy(() => import('./components/admin/PaymentSuccess'));
const StudentsList = lazy(() => import('./components/StudentsList'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./components/Contact'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: '/login',
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    )
  },
  {
    path: '/signup',
    element: (
      <MainLayout>
        <Signup />
      </MainLayout>
    )
  },
  {
    path: "/jobs",
    element: (
      <MainLayout>
        <Jobs />
      </MainLayout>
    )
  },
  {
    path: "/description/:id",
    element: (
      <MainLayout>
        <JobDescription />
      </MainLayout>
    )
  },
  {
    path: "/browse",
    element: (
      <MainLayout>
        <Browse />
      </MainLayout>
    )
  },
  {
    path: "/profile",
    element: (
      <MainLayout>
        <Profile />
      </MainLayout>
    )
  },
  {
    path: "/students",
    element: (
      <MainLayout>
        <StudentsList />
      </MainLayout>
    )
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/blog",
    element: <BlogSection />
  },
  {
    path: "/help",
    element: <HelpCenter />
  },
  // Admin routes
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Companies />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CompanyCreate />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CompanySetup />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <AdminJobs />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PostJob />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Applicants />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs/accepted",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <AcceptedApplicationsTable />
        </MainLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/payment-success/:applicationId",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <PaymentSuccess />
        </MainLayout>
      </ProtectedRoute>
    )
  }
], { basename: import.meta.env.BASE_URL });

function App() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;
