import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false)
  const {userData , setUserData} = useAuth();
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
    
    // ✅ Just set userData - the useEffect in AuthContext will handle localStorage
    setUserData(result.data.user);
    // ❌ REMOVE THIS LINE - it's redundant:
    // localStorage.setItem("userData", JSON.stringify(result.data.user));
    
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
          Sign Up
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="userName"
              className="text-[#46211A] text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleFieldData}
              className="rounded-md py-2 px-3 border border-[#46211A]/30 focus:outline-none focus:ring-2 focus:ring-[#A43820] focus:border-[#A43820]"
              placeholder="abc"
              required
            />
          </div>

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
              className="rounded-md py-2 px-3 border border-[#46211A]/30 focus:outline-none focus:ring-2 focus:ring-[#A43820] focus:border-[#A43820]"
              placeholder="abc@gmail.com"
              required
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
              className="rounded-md py-2 px-3 border border-[#46211A]/30 focus:outline-none focus:ring-2 focus:ring-[#A43820] focus:border-[#A43820]"
              placeholder="xyz@1234"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="profileImage"
              className="text-[#46211A] text-sm font-medium"
            >
              Profile Picture
            </label>
            <input
              type="file"
              name="profileImage"
              onChange={handleFileData}
              className="rounded-md border border-[#46211A]/30 focus:outline-none focus:ring-1 focus:ring-[#A43820] py-2 px-2"
              required
            />
          </div>
        </div>

        <button
           onClick={handleSignUp}
          className="mt-6 w-full py-2.5 rounded-lg bg-[#7d2f1e] text-white font-semibold hover:bg-[#46211A] transition-all duration-300"
        >
          {loading ? ("Signing Up wait !") : ("SignUp")}
        </button>
        <p className="mt-4 text-center">Already have an account ? <span className="text-[#A43820] font-bold tracking-wider hover:cursor-pointer" onClick={()=>navigate("/login")} >LOGIN</span> here</p>
      </div>
    </div>
  );
};

export default Signup;
