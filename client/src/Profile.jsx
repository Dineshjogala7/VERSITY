import { User, Mail, Calendar, TrendingUp, BookOpen, ShoppingCart, DollarSign, Award, Flame, Edit2 } from "lucide-react";
import { useAuth } from "./AuthContext/AuthContext";

const Profile = () => {
  const { userData, loading } = useAuth();

  // If still loading from localStorage
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Loading profile...</h2>
        </div>
      </div>
    );
  }

  // If userData is not loaded
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Please log in to view your profile</h2>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                  <img
                    src={userData.profileImage || "/default-avatar.png"}
                    alt={userData.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 bg-white text-purple-600 rounded-full p-2 shadow-lg hover:bg-purple-50 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {userData.userName}
                </h1>
                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-purple-100">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-100">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member for {getMemberSince(userData.createdAt)}</span>
                  </div>
                </div>

                {/* Streak Badge */}
                {userData.streak?.currentStreak > 0 && (
                  <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    <Flame className="w-5 h-5" />
                    <span>{userData.streak.currentStreak} Day Streak 🔥</span>
                  </div>
                )}
              </div>

              {/* Edit Profile Button */}
              <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">₹{userData.totalRevenue || 0}</p>
          </div>

          {/* Courses Uploaded */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Courses Created</h3>
            <p className="text-3xl font-bold text-gray-900">{userData.totalCoursesUploaded || 0}</p>
          </div>

          {/* Courses Purchased */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Courses Enrolled</h3>
            <p className="text-3xl font-bold text-gray-900">{userData.totalCoursesPurchased || 0}</p>
          </div>

          {/* Current Streak */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <Award className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Current Streak</h3>
            <p className="text-3xl font-bold text-gray-900">{userData.streak?.currentStreak || 0} days</p>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Account Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Full Name</span>
                <span className="font-semibold text-gray-900">{userData.userName}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Email</span>
                <span className="font-semibold text-gray-900 truncate ml-4">{userData.email}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Member Since</span>
                <span className="font-semibold text-gray-900">{formatDate(userData.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 text-sm">Last Updated</span>
                <span className="font-semibold text-gray-900">{formatDate(userData.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Activity Summary
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Learning Journey</p>
                  <p className="font-bold text-gray-900">{userData.totalCoursesPurchased || 0} courses enrolled</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teaching Impact</p>
                  <p className="font-bold text-gray-900">{userData.totalCoursesUploaded || 0} courses created</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Active</p>
                  <p className="font-bold text-gray-900">
                    {userData.streak?.lastVisited ? formatDate(userData.streak.lastVisited) : 'N/A'}
                  </p>
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