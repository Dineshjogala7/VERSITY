import { useNavigate } from "react-router-dom";
import { useCourse } from "../CourseContext/CourseContext";
import { BookOpen, Star, Users } from "lucide-react";

const Enrolled = () => {
  const { enrolledData } = useCourse();
  const navigate = useNavigate();

  const handleCourse = (courseid) => {
    navigate(`/course/${courseid}`);
  };

  if (!enrolledData || enrolledData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
        <div className="text-center">
          <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Enrolled Courses</h2>
          <p className="text-gray-600">Start learning by enrolling in a course!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Enrolled Courses</h1>
        <p className="text-gray-600">{enrolledData.length} course{enrolledData.length > 1 ? 's' : ''} enrolled</p>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledData.map((enroll, idx) => {
          const course = enroll.courseid;

          return (
            <div
              key={idx}
              onClick={() => handleCourse(course._id)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={course.thumbnail || "/default-thumbnail.jpg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {enroll.completed && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Completed
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-gray-700">
                      {course.avgRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({course.ratingsCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">{course.totalStudentsEnrolled} students</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Enrolled;