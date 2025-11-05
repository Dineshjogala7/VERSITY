import { useNavigate } from "react-router-dom";
import { useCourse } from "./CourseContext/CourseContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const { coursesData, loading, enrolledCourseIds, setEnrolledData, setEnrolledCourseIds } = useCourse();
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fix: Ensure component waits for initial data load
  useEffect(() => {
    if (!loading && coursesData) {
      setIsInitialLoad(false);
    }
  }, [loading, coursesData]);

  if (loading || isInitialLoad || !coursesData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl text-yellow-400 font-bold tracking-wider">LOADING COURSES</h2>
          <p className="text-gray-400 mt-2">Getting the best for you...</p>
        </div>
      </div>
    );
  }

  if (!loading && coursesData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
        <div className="text-center">
          <h2 className="text-3xl text-yellow-400 font-bold mb-2">NO COURSES AVAILABLE</h2>
          <p className="text-gray-400">Check back soon for new content</p>
        </div>
      </div>
    );
  }

  const [topCourse, ...otherCourses] = coursesData;

  const handleCourse = (courseid) => {
    if (enrolledCourseIds.has(courseid)) {
      navigate(`/course/${courseid}`);
    } else {
      toast.error("Enroll to view the course content!");
    }
  };

  const handleJoin = async (courseid) => {
    try {
      if (!courseid) return toast.error("Course ID not provided");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}enroll/joincourse/${courseid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);
      setEnrolledData((prev) => [...prev, res.data.enrolledCourse]);
      setEnrolledCourseIds((prev) => new Set(prev).add(res.data.enrolledCourse.courseid._id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* NYC-Style Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-9xl font-black">NYC</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-500 mb-2 tracking-tight relative">
          TOP RATED
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
          COURSES FOR <span className="text-yellow-400">YOU</span>
        </h2>
        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
      </div>

      {/* Featured Course - NYC Billboard Style */}
      <div className="w-full max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-zinc-900 to-slate-800 rounded-none md:rounded-lg overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20">
          <div className="relative">
            <div className="absolute top-0 left-0 bg-yellow-400 text-black px-6 py-2 font-black text-sm tracking-widest z-10">
              FEATURED
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              <div
                onClick={() => handleCourse(topCourse._id)}
                className="cursor-pointer relative overflow-hidden group"
              >
                <img
                  src={topCourse.thumbnail || "/default-thumbnail.jpg"}
                  alt={topCourse.title}
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8 flex flex-col justify-between bg-zinc-900">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight leading-tight">
                    {topCourse.title}
                  </h2>
                  <p className="text-gray-300 text-2xl mb-6 line-clamp-3">
                    ₹{topCourse.price}
                  </p>
                  <p className="text-gray-300 text-lg mb-6 line-clamp-3">
                    {topCourse.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl">⭐</span>
                      <span className="text-3xl font-black text-yellow-400">
                        {topCourse.avgRating.toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-sm">/5</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-gray-300 text-lg mb-6 line-clamp-3">Total students enrolled </p>
                    <p className="text-gray-300 text-lg mb-6 line-clamp-3">: {topCourse.totalStudentsEnrolled}</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm mb-2">CREATED BY</p>
                    <p className="text-white font-bold text-lg">
                      {topCourse.creator?.userName || "Unknown"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {topCourse.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-slate-800 text-yellow-400 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-yellow-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {enrolledCourseIds?.has(topCourse._id) ? (
                  <button
                    onClick={() => navigate("/enrolled")}
                    className="w-full bg-green-500 text-black py-4 font-black text-lg uppercase tracking-wider hover:bg-green-400 transition-all shadow-lg hover:shadow-green-500/50"
                  >
                    ✓ ENROLLED
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(topCourse._id)}
                    className="w-full bg-yellow-400 text-black py-4 font-black text-lg uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/50"
                  >
                    ENROLL NOW
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Courses - NYC Grid Style */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tight">
          MORE <span className="text-yellow-400">COURSES</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 overflow-hidden group hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 border-2 border-slate-700 hover:border-yellow-400"
            >
              <div
                onClick={() => handleCourse(course._id)}
                className="cursor-pointer relative overflow-hidden"
              >
                <img
                  src={course.thumbnail || "/default-thumbnail.jpg"}
                  alt={course.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-lg mb-4 line-clamp-2">
                  ₹{course.price}
                </p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  created By
                </p>
                
                <div className="flex gap-4 items-center">
                  <h1 className="text-white font-bold text-lg line-clamp-2">{course.creator?.userName}</h1>
                  <p className="text-white">Total Students Enrolled : {course.totalStudentsEnrolled}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-2xl">⭐</span>
                    <span className="text-yellow-400 font-bold text-lg">
                      {course.avgRating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {course.tags?.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-slate-800 text-yellow-400 px-2 py-1 text-xs font-bold uppercase border border-yellow-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {enrolledCourseIds?.has(course._id) ? (
                  <button
                    onClick={() => navigate("/enrolled")}
                    className="w-full bg-green-500 text-black py-3 font-bold uppercase tracking-wider hover:bg-green-400 transition-all text-sm"
                  >
                    ✓ ENROLLED
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(course._id)}
                    className="w-full bg-yellow-400 text-black py-3 font-bold uppercase tracking-wider hover:bg-yellow-300 transition-all text-sm"
                  >
                    ENROLL
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;