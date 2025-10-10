import { useEffect, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import "./home.css"

// Lazy load components that are below the fold
const CategoryCarousel = lazy(() => import('./CategoryCarousel'))
const LatestJobs = lazy(() => import('./LatestJobs'))
const Footer = lazy(() => import('./shared/Footer'))
const StudentsList = lazy(() => import('./StudentsList'))
const Chatbot = lazy(() => import('./Chatbot'))
const SuccessStories = lazy(() => import('./SuccessStories'))
const BlogSection = lazy(() => import('./BlogSection'))
const Contact = lazy(() => import('./Contact'))

// Loading component
const SectionLoader = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <div className="animate-pulse">Loading...</div>
  </div>
)

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className='homeDiv'>
        <HeroSection />
        
        <Suspense fallback={<SectionLoader />}>
          <Chatbot />
          <CategoryCarousel />
          <StudentsList />
          <SuccessStories />
          <BlogSection />
          <LatestJobs />
          <Contact />
        </Suspense>
      </div>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Home