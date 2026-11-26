import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { AppLayout } from './layouts/AppLayout';
import { Splash } from './pages/Splash';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
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

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash || location.pathname === '/') {
    return (
      <Splash
        onFinish={() => {
          setShowSplash(false);
          if (location.pathname === '/') {
            navigate('/home', { replace: true });
          }
        }}
      />
    );
  }

  return (
    <AppLayout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
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
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AnimatePresence>
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
