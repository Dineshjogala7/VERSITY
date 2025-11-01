import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Signup from "./Auth/Signup"
import Login from "./Auth/Login"
import Home from "./Home"
import { SearchIcon } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import { useCourse } from "./CourseContext/CourseContext"
import axios from "axios"
import Course from "./utils/Course"
import Enrolled from "./utils/Enrolled"

const App = () => {
  const token = localStorage.getItem("token")
  const { search, setSearch, coursesData, setCoursesData, loading, setLoading } = useCourse();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Check if it's a full site exit (not reload or navigation inside SPA)
      if (performance.getEntriesByType("navigation")[0]?.type === "navigate") {
        // User is leaving the site (not reloading)
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        localStorage.removeItem("userName");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleLogin = () => {
    if (!token) {
      navigate("/login");
      return
    }
    navigate("/profile")
  }

  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  }

  //FIX: Corrected search function
  const searchEnterButton = async (e) => {
    if (e.key !== 'Enter') return; // Exit early if not Enter key

    if (!search || !search.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      setLoading(true);

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}course/coursedetails/${search}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      // FIX: Set courses data from result
      setCoursesData(result.data.coursesData);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full ">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <header className="w-full bg-[#F1D3B2] shadow-md">
        <nav className="max-w-6xl mx-auto flex justify-between items-center py-3 px-4">

          <div className="flex items-center gap-4">
            <p
              className="text-2xl font-semibold text-[#46211A] tracking-wide cursor-pointer"
              onClick={() => navigate("/")}
            >
              Versity
            </p>

            <div className="relative">
              <input
                value={search}
                onKeyDown={searchEnterButton}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search courses..."
                className="rounded-md py-2 px-3 w-64 border border-[#46211A]/30 
                          focus:outline-none focus:border-[#A43820] 
                          text-[#46211A] placeholder:text-[#46211A]/60 bg-white"
              />
              <span className="absolute right-3 top-2.5 text-[#A43820]">
                <SearchIcon />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-md border border-[#46211A] text-[#46211A] font-medium 
                        hover:bg-[#46211A] hover:text-white transition-all duration-300"
            >
              Dashboard
            </button>

            <button
              className="px-4 py-2 rounded-md bg-[#A43820] text-white font-semibold hover:bg-[#46211A] transition-all duration-300"
            >
              Add Course
            </button>
            <button
              className="px-4 py-2 rounded-md bg-[#A43820] text-white font-semibold hover:bg-[#46211A] transition-all duration-300"
              onClick={()=>navigate('/enrolled')}
            >
              My learnings
            </button>

            <button
              className="px-4 py-2 rounded-md border border-[#A43820] text-[#A43820] font-medium hover:bg-[#A43820] hover:text-white transition-all duration-300"
              onClick={handleLogin}
            >
              {!token ? ("Login") : ("Profile")}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/course/:courseid" element={<ProtectedRoute><Course /></ProtectedRoute>} />
          <Route path="/enrolled" element={<ProtectedRoute><Enrolled/></ProtectedRoute>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App