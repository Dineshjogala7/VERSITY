import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Signup from "./Auth/Signup"
import Login from "./Auth/Login"
import Home from "./Home"
import { Search, Flame, BookOpen, Menu, X, TrendingUp, Award, Users, Globe, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import { useCourse } from "./CourseContext/CourseContext"
import axios from "axios"
import Course from "./utils/Course"
import Enrolled from "./utils/Enrolled"
import { useAuth } from "./AuthContext/AuthContext"
import Dashboard from "./utils/Dashboard"
import AddCourse from "./utils/AddCourse"
import FAQSection from "./utils/FAQSection"
import Quiz from "./utils/Quiz"

const App = () => {
  const token = localStorage.getItem("token")
  const { search, setSearch, coursesData, setCoursesData, loading, setLoading } = useCourse();
  const navigate = useNavigate();
  const { streak } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (performance.getEntriesByType("navigation")[0]?.type === "navigate") {
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
    setMobileMenuOpen(false);
  }

  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  }

  const searchEnterButton = async (e) => {
    if(!token)return toast.error("Login first to search components!!")
    if (e.key !== 'Enter') return;

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

      setCoursesData(result.data.coursesData);
      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDashboard = () => {
    navigate("/dashboard");
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
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
        theme="dark"
        toastClassName="!bg-zinc-900 !border-2 !border-yellow-400"
      />

      {/* NYC-Style Header */}
      <header className="w-full bg-zinc-900 border-b-4 border-yellow-400 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="bg-yellow-400 p-2">
                <BookOpen className="text-black" size={28} strokeWidth={3} />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter group-hover:text-yellow-400 transition-colors">
                VERSITY
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-2xl mx-8">
              <div className="relative flex-1">
                <input
                  value={search}
                  onKeyDown={searchEnterButton}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="SEARCH COURSES..."
                  className="w-full bg-slate-800 border-2 border-slate-700 text-white placeholder:text-gray-500 
                            py-3 px-4 pr-12 font-bold uppercase text-sm tracking-wider
                            focus:outline-none focus:border-yellow-400 transition-all"
                />
                <Search className="absolute right-4 top-3.5 text-yellow-400" size={20} strokeWidth={3} />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {token && (
                <>
                  <button
                    onClick={handleDashboard}
                    className="px-4 py-2 border-2 border-white text-white font-black uppercase text-sm
                              hover:bg-white hover:text-black transition-all tracking-wider"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => navigate('/addcourse')}
                    className="px-4 py-2 bg-yellow-400 text-black font-black uppercase text-sm
                              hover:bg-yellow-300 transition-all tracking-wider"
                  >
                    Add Course
                  </button>

                  <button
                    onClick={() => navigate('/enrolled')}
                    className="px-4 py-2 bg-yellow-400 text-black font-black uppercase text-sm
                              hover:bg-yellow-300 transition-all tracking-wider"
                  >
                    My Learnings
                  </button>

                  <div className="flex items-center gap-1 bg-slate-800 px-3 py-2 border-2 border-yellow-400">
                    <Flame className="text-yellow-400" size={20} />
                    <span className="font-black text-yellow-400 text-lg">{streak}</span>
                  </div>
                </>
              )}

              <button
                onClick={handleLogin}
                className="px-5 py-2 border-2 border-yellow-400 text-yellow-400 font-black uppercase text-sm
                          hover:bg-yellow-400 hover:text-black transition-all tracking-wider"
              >
                {!token ? "Login" : "Profile"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-yellow-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden mt-4">
            <div className="relative">
              <input
                value={search}
                onKeyDown={searchEnterButton}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="SEARCH COURSES..."
                className="w-full bg-slate-800 border-2 border-slate-700 text-white placeholder:text-gray-500 
                          py-3 px-4 pr-12 font-bold uppercase text-sm tracking-wider
                          focus:outline-none focus:border-yellow-400"
              />
              <Search className="absolute right-4 top-3.5 text-yellow-400" size={20} strokeWidth={3} />
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 border-t-2 border-slate-700 pt-4 space-y-3">
              {token && (
                <>
                  <button
                    onClick={handleDashboard}
                    className="w-full px-4 py-3 border-2 border-white text-white font-black uppercase text-sm
                              hover:bg-white hover:text-black transition-all tracking-wider"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => { navigate('/addcourse'); setMobileMenuOpen(false); }}
                    className="w-full px-4 py-3 bg-yellow-400 text-black font-black uppercase text-sm
                              hover:bg-yellow-300 transition-all tracking-wider"
                  >
                    Add Course
                  </button>

                  <button
                    onClick={() => { navigate('/enrolled'); setMobileMenuOpen(false); }}
                    className="w-full px-4 py-3 bg-yellow-400 text-black font-black uppercase text-sm
                              hover:bg-yellow-300 transition-all tracking-wider"
                  >
                    My Learnings
                  </button>

                  <div className="flex items-center justify-center gap-2 bg-slate-800 px-4 py-3 border-2 border-yellow-400">
                    <Flame className="text-yellow-400" size={20} />
                    <span className="font-black text-yellow-400 text-lg">Streak: {streak}</span>
                  </div>
                </>
              )}

              <button
                onClick={handleLogin}
                className="w-full px-5 py-3 border-2 border-yellow-400 text-yellow-400 font-black uppercase text-sm
                          hover:bg-yellow-400 hover:text-black transition-all tracking-wider"
              >
                {!token ? "Login" : "Profile"}
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/course/:courseid" element={<ProtectedRoute><Course /></ProtectedRoute>} />
          <Route path="/enrolled" element={<ProtectedRoute><Enrolled /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/addcourse" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
          <Route path="/quiz" element ={<ProtectedRoute><Quiz/></ProtectedRoute>}/>
        </Routes>
        <FAQSection />
      </main>

      {/* NYC-Style Footer */}
      <footer className="bg-black border-t-4 border-yellow-400 text-white mt-auto ">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About Versity */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-yellow-400 p-2">
                  <BookOpen className="text-black" size={24} strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-black tracking-tighter">VERSITY</h3>
              </div>
              <p className="text-gray-400 font-semibold text-sm leading-relaxed">
                The ultimate learning platform for aspiring professionals. Learn from industry experts and transform your career.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="bg-slate-800 p-2 hover:bg-yellow-400 hover:text-black transition-all border-2 border-transparent hover:border-yellow-400">
                  <Github size={20} strokeWidth={2} />
                </a>
                <a href="#" className="bg-slate-800 p-2 hover:bg-yellow-400 hover:text-black transition-all border-2 border-transparent hover:border-yellow-400">
                  <Linkedin size={20} strokeWidth={2} />
                </a>
                <a href="#" className="bg-slate-800 p-2 hover:bg-yellow-400 hover:text-black transition-all border-2 border-transparent hover:border-yellow-400">
                  <Twitter size={20} strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-yellow-400 font-black uppercase tracking-wider mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/enrolled" className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase">
                    My Learnings
                  </a>
                </li>
                <li>
                  <a href="/addcourse" className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase">
                    Teach on Versity
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-yellow-400 font-black uppercase tracking-wider mb-4 text-sm">Top Categories</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase cursor-pointer">
                  Development
                </li>
                <li className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase cursor-pointer">
                  Business
                </li>
                <li className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase cursor-pointer">
                  Design
                </li>
                <li className="text-gray-400 hover:text-yellow-400 font-bold text-sm transition-colors uppercase cursor-pointer">
                  Marketing
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div>
              <h4 className="text-yellow-400 font-black uppercase tracking-wider mb-4 text-sm">Platform Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-400 p-2">
                    <Users size={20} className="text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg">50K+</p>
                    <p className="text-gray-400 text-xs font-bold uppercase">Students</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-400 p-2">
                    <BookOpen size={20} className="text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg">1000+</p>
                    <p className="text-gray-400 text-xs font-bold uppercase">Courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-400 p-2">
                    <Award size={20} className="text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg">500+</p>
                    <p className="text-gray-400 text-xs font-bold uppercase">Instructors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-slate-800 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm font-bold uppercase">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Terms of Service</a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Cookie Policy</a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Help Center</a>
            </div>

            <p className="text-gray-400 text-sm font-bold">
              © 2025 <span className="text-yellow-400">VERSITY</span>. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>

        {/* Bottom Accent Strip */}
        <div className="bg-yellow-400 h-2"></div>
      </footer>
    </div>
  );
};

export default App;