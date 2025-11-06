import { User, Mail, Calendar, TrendingUp, BookOpen, ShoppingCart, DollarSign, Award, Flame, Edit2, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData, loading } = useAuth();
  const navigate = useNavigate();
  
  // If still loading from localStorage
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-2xl text-yellow-400 font-black tracking-wider">LOADING PROFILE</p>
        </div>
      </div>
    );
  }

  // If userData is not loaded
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black text-yellow-400 uppercase tracking-wider">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMemberSince = (date) => {
    const created = new Date(date);
    const now = new Date();
    const months = Math.floor((now - created) / (1000 * 60 * 60 * 24 * 30));
    return months > 0 ? `${months} month${months > 1 ? 's' : ''}` : 'Less than a month';
  };
  
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 relative">
          <div className="absolute inset-0 flex items-center justify-start opacity-5">
            <span className="text-9xl font-black">USER</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 mb-2 tracking-tight relative">
            PROFILE
          </h1>
          <p className="text-gray-400 text-lg font-bold uppercase tracking-wider relative">
            Your Account • Your Journey
          </p>
          <div className="w-32 h-1 bg-yellow-400 mt-4"></div>
          <button onClick={()=>navigate('/quiz')}  className="absolute bottom-2 right-2 bg-yellow-400 text-black p-2 hover:bg-yellow-300 transition-colors font-mono font-bold">Take Mock Quizz</button>
        </div>

        {/* Profile Header Card */}
        <div className="bg-zinc-900 border-2 border-slate-700 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-1">
            <div className="bg-zinc-900 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-yellow-400 overflow-hidden bg-zinc-800">
                    <img
                      src={userData.profileImage || "/default-avatar.png"}
                      alt={userData.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-yellow-400 text-black p-2 hover:bg-yellow-300 transition-colors">
                    <Edit2 className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">
                    {userData.userName}
                  </h1>
                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-sm font-semibold">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-sm font-semibold">Member for {getMemberSince(userData.createdAt)}</span>
                    </div>
                  </div>

                  {/* Streak Badge */}
                  {userData.streak?.currentStreak > 0 && (
                    <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-black uppercase tracking-wide">
                      <Flame className="w-5 h-5" strokeWidth={3} />
                      <span>{userData.streak.currentStreak} Day Streak 🔥</span>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-black uppercase tracking-wide transition-colors flex items-center gap-2 border-2 border-red-500">
                  <LogOut className="w-5 h-5" strokeWidth={3} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Revenue */}
          <div className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 p-6 group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-400 p-3">
                <DollarSign className="text-black" size={28} strokeWidth={3} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Revenue</p>
                <p className="text-3xl font-black text-white">₹{userData.totalRevenue || 0}</p>
              </div>
            </div>
            <div className="h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
          </div>

          {/* Courses Uploaded */}
          <div className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 p-6 group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-400 p-3">
                <BookOpen className="text-black" size={28} strokeWidth={3} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Created</p>
                <p className="text-3xl font-black text-white">{userData.totalCoursesUploaded || 0}</p>
              </div>
            </div>
            <div className="h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
          </div>

          {/* Courses Purchased */}
          <div className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 p-6 group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-400 p-3">
                <ShoppingCart className="text-black" size={28} strokeWidth={3} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Enrolled</p>
                <p className="text-3xl font-black text-white">{userData.totalCoursesPurchased || 0}</p>
              </div>
            </div>
            <div className="h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
          </div>

          {/* Current Streak */}
          <div className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 p-6 group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-400 p-3">
                <Flame className="text-black" size={28} strokeWidth={3} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Streak</p>
                <p className="text-3xl font-black text-white">{userData.streak?.currentStreak || 0} days</p>
              </div>
            </div>
            <div className="h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="bg-zinc-900 border-2 border-slate-700 overflow-hidden">
            <div className="bg-yellow-400 px-6 py-4">
              <h2 className="text-xl font-black text-black uppercase tracking-tight flex items-center gap-2">
                <User className="w-5 h-5" strokeWidth={3} />
                Account Details
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b-2 border-slate-700">
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-wide">Full Name</span>
                  <span className="font-black text-white">{userData.userName}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-slate-700">
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-wide">Email</span>
                  <span className="font-black text-white truncate ml-4">{userData.email}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-slate-700">
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-wide">Member Since</span>
                  <span className="font-black text-white">{formatDate(userData.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-wide">Last Updated</span>
                  <span className="font-black text-white">{formatDate(userData.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-zinc-900 border-2 border-slate-700 overflow-hidden">
            <div className="bg-yellow-400 px-6 py-4">
              <h2 className="text-xl font-black text-black uppercase tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5" strokeWidth={3} />
                Activity Summary
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-800 border-l-4 border-yellow-400">
                  <div className="bg-yellow-400 p-3">
                    <BookOpen className="w-5 h-5 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Learning Journey</p>
                    <p className="font-black text-white">{userData.totalCoursesPurchased || 0} courses enrolled</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-slate-800 border-l-4 border-yellow-400">
                  <div className="bg-yellow-400 p-3">
                    <Award className="w-5 h-5 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Teaching Impact</p>
                    <p className="font-black text-white">{userData.totalCoursesUploaded || 0} courses created</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-800 border-l-4 border-yellow-400">
                  <div className="bg-yellow-400 p-3">
                    <Flame className="w-5 h-5 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Last Active</p>
                    <p className="font-black text-white">
                      {userData.streak?.lastVisited ? formatDate(userData.streak.lastVisited) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;