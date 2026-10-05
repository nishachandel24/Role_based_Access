import { FaUser, FaBriefcase } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const roles = [
  "Admin",
  "Manager",
  "Analyst",
];

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
      name: "",
      email: "",
      role: "Admin",
      password: "",
      remember: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
 });  

 const handleSubmit = (e) => {
  e.preventDefault();

  const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@spgi\.com$/;

  let newErrors = { name: "", email: "", password: "" };
  let valid = true;

  // Validate Name
  if (!nameRegex.test(form.name)) {
    newErrors.name =
      "Name must start with a capital letter and contain only alphabets.";
    valid = false;
  }

  // Validate Email (only company email allowed)
  if (!emailRegex.test(form.email)) {
    newErrors.email =
      "Only company email addresses (@spgi.com) are allowed.";
    valid = false;
  }

  // Check password in localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const storedUser = users.find(u => u.email === form.email);
  
  if (storedUser && storedUser.password !== form.password) {
    newErrors.password = "Incorrect password";
    valid = false;
  }

  setErrors(newErrors);

  if (!valid) return;

  // Store user in localStorage if not exists
  const userExists = users.find(u => u.email === form.email);
  
  if (!userExists) {
    users.push({
      name: form.name,
      email: form.email,
      role: form.role,
      password: form.password
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  const userData = {
    name: form.name,
    email: form.email,
    role: form.role,
  };

  login(userData);

  // Redirect to dashboard - role-based features will be filtered by sidebar
  navigate("/");
};

   const handleForgotPassword = () => {
    navigate("/forgot-password");
   };
  

  
  
  return (
    <div className="flex w-full items-start justify-center bg-gray-100 px-3 pb-6 pt-3 md:px-4 md:pt-4 lg:w-1/2 lg:items-center lg:px-6 lg:py-6">
      <div className="w-full max-w-[480px] rounded-[30px] border border-slate-200/80 bg-white/90 px-4 py-5 shadow-[0_25px_80px_rgba(15,118,110,0.12)] backdrop-blur-sm md:px-6 md:py-7 lg:px-7 lg:py-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 md:text-[2.2rem]">Welcome Back</h2>
          <p className="mt-2 text-sm font-medium text-emerald-600 md:text-base">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-4.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 md:text-base">Full Name</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100 md:px-4 md:py-3.5">
              <FaUser className="text-base text-slate-400 md:text-lg" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                pattern="[A-Z][a-zA-Z\s]*"
                title="Name must start with a capital letter"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none md:text-base"
                required
              />
            </div>
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 md:text-base">Email Address</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100 md:px-4 md:py-3.5">
              <FaUser className="text-base text-slate-400 md:text-lg" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                title="Enter a valid email address"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none md:text-base"
                required
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 md:text-base">Select Role</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100 md:px-4 md:py-3.5">
              <FaBriefcase className="text-base text-slate-400 md:text-lg" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full appearance-none bg-transparent text-sm text-slate-800 focus:outline-none md:text-base"
                required
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 md:text-base">Password</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100 md:px-4 md:py-3.5">
              <MdLock className="text-base text-slate-400 md:text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none md:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-600 md:text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

            <div className="mt-1 flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline md:text-base"
              >
                Forgot Password
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-600 active:translate-y-0 md:py-4 md:text-lg"
          >
            Sign In
            <FiArrowRight className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
}
