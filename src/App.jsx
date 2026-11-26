import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { AppLayout } from './layouts/AppLayout';
import { Splash } from './pages/Splash';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServiceDetails } from './pages/ServiceDetails';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { RequestEstimate } from './pages/RequestEstimate';
import { BusinessHours } from './pages/BusinessHours';
import { Reviews } from './pages/Reviews';
import { Menu } from './pages/Menu';
import { Directory } from './pages/Directory';
import { DirectoryCategory } from './pages/DirectoryCategory';
import { DirectoryInfo } from './pages/DirectoryInfo';
import { FAQs } from './pages/FAQs';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { DigitalMarketing } from './pages/DigitalMarketing';
import { SeoServices } from './pages/SeoServices';
import { BusinessListings } from './pages/BusinessListings';
import { MantaBlog } from './pages/MantaBlog';
import { MantaInfoPage } from './pages/MantaInfoPage';

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  const isSplashVisible = showSplash || location.pathname === '/';

  return (
    <AppLayout hideChrome={isSplashVisible}>
      {isSplashVisible ? (
        <Splash
          onFinish={() => {
            setShowSplash(false);
            if (location.pathname === '/') {
              navigate('/home', { replace: true });
            }
          }}
        />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Directory />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/estimate" element={<RequestEstimate />} />
          <Route path="/hours" element={<BusinessHours />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/directory/category/:categoryId" element={<DirectoryCategory />} />
          <Route path="/directory/info/:topicId" element={<DirectoryInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/seo-services" element={<SeoServices />} />
          <Route path="/seo-faqs" element={<SeoServices />} />
          <Route path="/business-listings" element={<BusinessListings />} />
          <Route path="/blog" element={<MantaBlog />} />
          <Route path="/manta-about" element={<MantaInfoPage mode="about" />} />
          <Route path="/manta-reviews" element={<MantaInfoPage mode="reviews" />} />
          <Route path="/terms" element={<MantaInfoPage mode="terms" />} />
          <Route path="/privacy" element={<MantaInfoPage mode="privacy" />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AnimatePresence>
      )}
    </AppLayout>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MotionConfig>
  );
}
