import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { User, Mail, Lock, Upload, UserPlus, LogIn } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useAuth();

  const handleFieldData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileData = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSignUp = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!formData.email || !formData.password || !formData.profileImage || !formData.userName) {
        return toast.error("All fields are necessary!!");
      }
      
      const data = new FormData();
      data.append("userName", formData.userName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("profileImage", formData.profileImage);
      
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}cred/signup`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Store token and basic info
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userid", result.data.user._id);
      localStorage.setItem("username", result.data.user.userName);
      
      setUserData(result.data.user);
      
      console.log(result.data);
      navigate("/");
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 mb-2 tracking-tight uppercase">
            SIGN UP
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          <p className="text-gray-400 mt-4 font-bold uppercase tracking-wider text-sm">
            Create Your Account
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-zinc-900 border-2 border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-1">
            <div className="bg-zinc-900 p-8">
              <div className="space-y-6">
                {/* Username Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="userName"
                    className="text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-yellow-400" strokeWidth={2.5} />
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleFieldData}
                    className="bg-slate-800 text-white py-3 px-4 border-2 border-slate-700 focus:outline-none focus:border-yellow-400 transition-colors font-semibold"
                    placeholder="johndoe"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-yellow-400" strokeWidth={2.5} />
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleFieldData}
                    className="bg-slate-800 text-white py-3 px-4 border-2 border-slate-700 focus:outline-none focus:border-yellow-400 transition-colors font-semibold"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-yellow-400" strokeWidth={2.5} />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFieldData}
                    className="bg-slate-800 text-white py-3 px-4 border-2 border-slate-700 focus:outline-none focus:border-yellow-400 transition-colors font-semibold"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Profile Picture Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="profileImage"
                    className="text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-yellow-400" strokeWidth={2.5} />
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleFileData}
                    className="bg-slate-800 text-white py-3 px-4 border-2 border-slate-700 focus:outline-none focus:border-yellow-400 transition-colors font-semibold file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-yellow-400 file:text-black file:font-black file:uppercase file:text-xs file:cursor-pointer"
                    required
                  />
                  {formData.profileImage && (
                    <p className="text-yellow-400 text-xs font-bold mt-1">
                      ✓ {formData.profileImage.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="mt-8 w-full py-4 bg-yellow-400 text-black font-black uppercase tracking-wider hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    SIGNING UP...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" strokeWidth={3} />
                    SIGN UP
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm font-semibold">
                  Already have an account?{" "}
                  <span 
                    className="text-yellow-400 font-black hover:cursor-pointer hover:text-yellow-300 transition-colors uppercase tracking-wide" 
                    onClick={() => navigate("/login")}
                  >
                    LOGIN
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;