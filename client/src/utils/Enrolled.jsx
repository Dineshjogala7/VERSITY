import { useNavigate } from "react-router-dom";
import { useCourse } from "../CourseContext/CourseContext";
import { BookOpen, Star, Users, Award } from "lucide-react";

const Enrolled = () => {
  const { enrolledData } = useCourse();
  const navigate = useNavigate();

  const handleCourse = (courseid) => {
    navigate(`/course/${courseid}`);
  };

  if (!enrolledData || enrolledData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="bg-zinc-900 border-2 border-slate-700 p-16">
            <BookOpen className="w-32 h-32 text-slate-700 mx-auto mb-6" strokeWidth={2} />
            <h2 className="text-4xl font-black text-yellow-400 mb-4 uppercase tracking-tight">
              No Courses Yet
            </h2>
            <p className="text-gray-400 text-lg font-bold uppercase tracking-wider">
              Start Your Learning Journey
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 py-10 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 relative">
        <div className="absolute inset-0 flex items-center justify-start opacity-5">
          <span className="text-9xl font-black">LEARN</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 mb-2 tracking-tight relative">
          MY COURSES
        </h1>
        <p className="text-gray-400 text-lg font-bold uppercase tracking-wider relative">
          {enrolledData.length} Course{enrolledData.length > 1 ? 's' : ''} Enrolled • Keep Learning
        </p>
        <div className="w-32 h-1 bg-yellow-400 mt-4"></div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledData.map((enroll, idx) => {
          const course = enroll.courseid;

          return (
            <div
              key={idx}
              onClick={() => handleCourse(course._id)}
              className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail || "/default-thumbnail.jpg"}
                  alt={course.title}
                  className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                {enroll.completed && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 font-black uppercase text-xs tracking-wider">
                    ✓ Completed
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-yellow-400 text-black px-3 py-1 text-xs font-black uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-3 line-clamp-2 uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-semibold">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="space-y-3 border-t-2 border-slate-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-yellow-400 p-1">
                        <Star className="w-3 h-3 text-black" strokeWidth={3} fill="black" />
                      </div>
                      <span className="font-black text-white text-sm">
                        {course.avgRating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500 font-bold">
                        ({course.ratingsCount})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-xs font-bold uppercase">{course.totalStudentsEnrolled}</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">Instructor</span>
                    <span className="text-gray-300 font-bold">{course.creator?.userName || 'Unknown'}</span>
                  </div>
                </div>

                {/* Continue Button */}
                <button className="w-full mt-4 bg-yellow-400 text-black py-3 font-black uppercase tracking-wider hover:bg-yellow-300 transition-colors text-sm">
                  {enroll.completed ? 'Review Course' : 'Continue Learning'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Enrolled;