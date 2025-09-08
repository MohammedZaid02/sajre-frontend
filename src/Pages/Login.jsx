import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../Utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, { y: 40, opacity: 0, duration: 0.6, ease: "power3.out" });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let res;
      
      // Try admin login first if email matches admin email
      if (email === 'mohammedzaidmz19@gmail.com') {
        try {
          res = await api.adminLogin(email, password);
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/admin");
          return;
        } catch (adminErr) {
          // If admin login fails, fall back to regular login
          console.log('Admin login failed, trying regular login');
        }
      }
      
      // Regular login for other users
      res = await api.login(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // route per role
      const role = res.user?.role;
      if (role === "admin") navigate("/admin");
      else if (role === "vendor") navigate("/vendor");
      else if (role === "mentor") navigate("/mentor");
      else navigate("/courses");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3E5879] via-[#5c7698] to-[#3E5879] p-6">
      {/* Floating background circles */}
      <motion.div
        className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
        animate={{ x: [0, -80, 80, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="relative z-10 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-8 shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/80 focus:bg-white outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/80 focus:bg-white outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-200 bg-red-600/40 rounded p-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 space-y-2">
          <p className="text-center text-white/80 text-sm">
            Don't have an account? <a href="/register" className="underline">Create one</a>
          </p>
          {/* <div className="bg-white/10 rounded-lg p-3 mt-4">
            <p className="text-white/90 text-xs font-medium mb-2">🔧 Admin Demo Access:</p>
            <p className="text-white/70 text-xs">Email: mohammedzaidmz19@gmail.com</p>
            <p className="text-white/70 text-xs">Password: admin123</p>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}