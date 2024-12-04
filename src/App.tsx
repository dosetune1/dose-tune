import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Services } from './components/services/Services';
import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import { OrderForm } from './components/order/OrderForm';
import { AdminPanel } from './components/admin/AdminPanel';
import { LoginForm } from './components/admin/LoginForm';
import { ChatBot } from './components/chatbot/ChatBot';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { useAuthStore } from './store/authStore';
import { FreeDeliveryPopup } from './components/common/FreeDeliveryPopup';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <About />
                <Contact />
              </>
            } />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/admin" element={<LoginForm />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <WhatsAppButton />
        <ChatBot />
        <FreeDeliveryPopup />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
