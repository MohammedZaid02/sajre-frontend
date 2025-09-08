import { motion } from "framer-motion";
import gsap from "gsap";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Utils/api";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [vendorKey, setVendorKey] = useState("");
  const [mentorKey, setMentorKey] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, { y: 40, opacity: 0, duration: 0.6, ease: "power3.out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let res;
      if (role === "student") {
        if (!referralCode.trim()) throw new Error("Referral code is required for students");
        res = await api.registerStudent({ name, email, password, phone, referralCode });
      } else if (role === "vendor") {
        if (!vendorKey.trim()) throw new Error("Vendor key is required for vendors");
        res = await api.registerVendor({ name, email, password, phone, vendorKey });
      } else if (role === "mentor") {
        if (!mentorKey.trim()) throw new Error("Mentor referral code is required for mentors");
        if (!specialization.trim()) throw new Error("Specialization is required for mentors");
        res = await api.registerMentor({ name, email, password, phone, mentorKey, specialization, bio });
      }

      // Save email for OTP verification and redirect
      localStorage.setItem("pendingEmail", email);
      navigate("/otp");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3E5879] via-[#5c7698] to-[#3E5879] p-6">
      {/* Floating circles */}
      <motion.div
        className="absolute rounded-full w-72 h-72 bg-white/20 blur-3xl"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bottom-20 right-10 w-96 h-96 bg-purple-400/30 blur-3xl"
        animate={{ x: [0, -80, 80, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg p-8 border shadow-2xl backdrop-blur-md bg-white/20 border-white/30 rounded-2xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div className="grid grid-cols-3 gap-2">
            {["student", "vendor", "mentor"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                  className={"py-2 rounded-lg border text-sm capitalize " + (role === r ? "bg-black text-white" : "bg-white/80")}
              >
                {r}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pr-10 rounded-lg outline-none bg-white/80 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute text-gray-600 -translate-y-1/2 right-2 top-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
          />

          {/* Conditional fields */}
          {role === "student" && (
            <input
              type="text"
              placeholder="Referral code (required)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
            />
          )}

          {role === "vendor" && (
            <input
              type="text"
              placeholder="Vendor key (required)"
              value={vendorKey}
              onChange={(e) => setVendorKey(e.target.value)}
              className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
            />
          )}

          {role === "mentor" && (
            <>
              <input
                type="text"
                placeholder="Mentor referral code (required)"
                value={mentorKey}
                onChange={(e) => setMentorKey(e.target.value)}
                className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Specialization (required)"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
              />
              <textarea
                placeholder="Short bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-lg outline-none bg-white/80 focus:bg-white"
              />
            </>
          )}

          {error && <p className="p-2 text-sm text-red-200 rounded bg-red-600/40">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-black rounded-lg hover:bg-gray-900 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-white/80">
          Already have an account? <a href="/login" className="underline">Sign in</a>
        </p>
      </motion.div>
    </div>
  );
}