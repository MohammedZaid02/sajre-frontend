import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./page/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Gallery from "./Components/Gallery";
import Register from "./Components/Register";
import Career from "./Components/Career";
import Otp from "./Components/Otp";
import Contact from "./Components/Contact";
import Courses from "./Components/Courses";
import Admin from "./Pages/Admin";
import Userdashboard from "./Components/Userdashboard";
import Payment from "./Components/Payment";
import Footer from "./page/Footer";
import Vendor from "./Pages/Vendor";
import Mentor from "./Pages/Mentor";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  const location = useLocation();

  /// Pages where you DON'T want Navbar
  const noNavbarRoutes = ["/admin", "/mentor", "/vendor"];

  return (
    <>
      <ToastContainer />
      {/* Show Navbar only if current route is not in noNavbarRoutes */}
      {!noNavbarRoutes.includes(location.pathname.toLowerCase()) && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/footer" element={<Footer />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/vendor" element={<Vendor />} />
      </Routes>
    </>
  );
}
