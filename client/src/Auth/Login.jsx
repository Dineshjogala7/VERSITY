
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData, setStreak } = useAuth();

    const handleFieldData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            
            if (!formData.email || !formData.password) {
                return toast.error("Email and password are required!!");
            }
            
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}cred/login`,
                formData
            );
            
            // Store token and basic info
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userid", result.data.user._id);
            localStorage.setItem("username", result.data.user.userName);
            
            // Set userData - the useEffect in AuthContext will handle localStorage
            setUserData(result.data.user);
            
            console.log(result.data);
            
            toast.success(result.data.message);
            navigate("/");
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
                        LOGIN
                    </h1>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    <p className="text-gray-400 mt-4 font-bold uppercase tracking-wider text-sm">
                        Access Your Account
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-900 border-2 border-slate-700 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-1">
                        <div className="bg-zinc-900 p-8">
                            <div className="space-y-6">
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
                                    />
                                </div>
                            </div>
                            
                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="mt-8 w-full py-4 bg-yellow-400 text-black font-black uppercase tracking-wider hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        LOGGING IN...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" strokeWidth={3} />
                                        LOGIN
                                    </>
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-400 text-sm font-semibold">
                                    Don't have an account?{" "}
                                    <span 
                                        className="text-yellow-400 font-black hover:cursor-pointer hover:text-yellow-300 transition-colors uppercase tracking-wide" 
                                        onClick={() => navigate("/signup")}
                                    >
                                        SIGN UP
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;