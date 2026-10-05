import { useState } from "react";
import { FaCheck, FaArrowLeft, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/spgi-logo.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Reset Password Handler
  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user) => user.email === email);

    if (!userExists) {
      setError("Email not found in our records");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-white px-3 py-4 text-gray-800 sm:px-4 lg:min-h-screen"
      style={{
        backgroundImage: `linear-gradient(135deg, #ecfdf5 0%, #d1fae5 36%, #a7f3d0 68%, #6ee7b7 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradientFlow 16s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes cardReveal {
          0% { opacity: 0; transform: scale(0.92) translateY(14px); }
          60% { opacity: 1; transform: scale(1.02) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Animated Light Orbs */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(110, 231, 183, 0.34), transparent)",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(22, 101, 52, 0.26), transparent)",
          animation: "shimmer 5s ease-in-out infinite 1s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.22), transparent)",
          animation: "shimmer 6s ease-in-out infinite 2s",
        }}
      />

      <div
        className="relative z-10 mx-auto w-full max-w-md overflow-visible rounded-2xl border border-white/70 bg-white/95 p-0 shadow-2xl backdrop-blur-xl md:rounded-3xl"
        style={{ animation: "cardReveal 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) 1" }}
      >
        {/* Company Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-center md:p-5">
          <div className="flex items-center justify-center mb-2">
            <img src={logo} alt="Shree Pankaj Green Innovation" className="h-8 md:h-10 w-auto object-contain" />
          </div>
          <p className="text-white text-opacity-90 text-xs font-medium tracking-widest">
            SECURE ACCOUNT RECOVERY
          </p>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden p-4 md:p-6">
          <>
              <div className="mb-4 flex justify-center md:mb-5">
                <div className="rounded-full bg-emerald-100 p-3.5 md:p-4">
                  <FaLock className="text-2xl text-emerald-600 md:text-3xl" />
                </div>
              </div>
              <h1 className="mb-2 text-center text-2xl font-bold text-slate-800 md:text-3xl">Forgot Password</h1>
              <p className="mb-6 text-center text-xs text-slate-600 md:mb-7 md:text-sm">
                Verify your email to reset your password
              </p>

              <form onSubmit={handleResetSubmit} className="space-y-3.5 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 md:right-4 top-2 md:top-3 text-slate-500 hover:text-slate-700 text-xs font-medium"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    required
                  />
                </div>

                {error && <p className="text-red-600 text-xs md:text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg md:py-2.5 md:text-base"
                >
                  Reset Password
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                    navigate("/login");
                  }}
                  className="flex w-full items-center justify-center gap-2 py-2 text-sm text-slate-600 transition-all hover:text-slate-800 md:py-2.5 md:text-base"
                >
                  <FaArrowLeft className="text-sm" />
                  Back to Login
                </button>
              </form>
            </>
        </div>

        {/* Company Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs text-slate-500 md:px-6 md:py-3.5">
          <p>🔒 Enterprise-Grade Security | SPGI Admin Portal</p>
          <p className="mt-1 text-slate-400 text-xs">Your data is protected with end-to-end encryption</p>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full text-center transform transition-all">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 rounded-full p-4 md:p-5 animate-bounce">
                <FaCheck className="text-3xl md:text-4xl text-emerald-600" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Password Updated!</h2>
            <p className="text-slate-600 text-sm md:text-base mb-1">
              Your password has been securely changed.
            </p>
            <p className="text-xs md:text-sm text-slate-500">
              Redirecting to login...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
