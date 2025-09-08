import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Utils/api";

export default function OTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pendingEmail = localStorage.getItem("pendingEmail") || "";

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.verifyOtp(pendingEmail, otp);
      // On success, force user to login
      localStorage.removeItem("pendingEmail");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!pendingEmail) return <p className="text-center mt-20 text-red-500">No pending email found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center mb-2">OTP Verification</h2>
        <p className="text-center">Enter OTP sent to <strong>{pendingEmail}</strong></p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full p-3 border rounded-md"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button onClick={handleVerify} disabled={loading} className="w-full bg-black text-white py-2 rounded-md">
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}