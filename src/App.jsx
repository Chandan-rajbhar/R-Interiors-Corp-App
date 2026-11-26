import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

function AppRoutes() {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Splash />;
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
