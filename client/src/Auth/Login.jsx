import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useAuth();

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
            
            // ✅ Changed loginData to formData
            if (!formData.email || !formData.password) {
                return toast.error("Email and password are required!!");
            }
            
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}cred/login`,
                formData  // ✅ Changed loginData to formData
            );
            
            // Store token and basic info
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userid", result.data.user._id);
            localStorage.setItem("username", result.data.user.userName);
            
            // Set userData - the useEffect in AuthContext will handle localStorage
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
        <div className="min-h-screen w-full flex items-center justify-center bg-[#e3d8cb] font-serif">
            <div className="w-full max-w-md bg-white/90 shadow-lg rounded-2xl p-8 border border-[#46211A]/20">
                <h1 className="text-center text-3xl font-semibold text-[#46211A] mb-6">
                    Login
                </h1>
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-[#46211A] text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleFieldData}
                            className="rounded-md py-2 px-3 border border-[#46211A]/30 focus:outline-none focus:border-[#A43820]"
                            placeholder="abc@gmail.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-[#46211A] text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFieldData}
                            className="rounded-md py-2 px-3 border border-[#46211A]/30 focus:outline-none focus:border-[#A43820]"
                            placeholder="xyz@1234"
                        />
                    </div>
                </div>
                
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="mt-6 w-full py-2.5 rounded-lg bg-[#7d2f1e] text-white font-semibold hover:bg-[#46211A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="mt-4 text-center">
                    Don't have an account? {" "}
                    <span 
                        className="text-[#A43820] font-bold tracking-wider hover:cursor-pointer hover:underline" 
                        onClick={() => navigate("/signup")}
                    >
                        SignUp
                    </span> 
                    {" "}here
                </p>
            </div>
        </div>
    )
}

export default Login