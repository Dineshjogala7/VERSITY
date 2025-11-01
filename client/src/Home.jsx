import { useNavigate } from "react-router-dom";
import { useCourse } from "./CourseContext/CourseContext";
import { toast } from "react-toastify";

const Home = () => {
  const { coursesData, loading , enrolledCourseIds ,  } = useCourse();
    const navigate = useNavigate();
    if (loading || !coursesData) {
    // Still fetching or context not ready yet
    return (
        <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl text-gray-700">Loading courses...</h2>
        </div>
    );
    }

    // Only show "No courses" if we are done loading AND array is empty
    if (!loading && coursesData.length === 0) {
    return (
        <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl text-gray-700">No courses available</h2>
        </div>
    );
    }

  const [topCourse, ...otherCourses] = coursesData;


 const handleCourse = (courseid) => {
  if (enrolledCourseIds.has(courseid)) {
    navigate(`/course/${courseid}`);
  } else {
    toast.error("Enroll to view the course content!!");
  }
};


  return (
    <div className="min-h-screen w-full bg-blue-300 font-mono py-10 px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold">
          Here are the Top <span className="text-red-400 font-serif">Rated </span> Courses
        </h1>
        <h2 className="text-2xl mt-1">
          for <span className="text-red-400 font-serif">YOU</span>
        </h2>
      </div>

      {/* Featured Course */}
      <div className="w-full max-w-6xl mx-auto mb-10 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-lg">
        <div 
            onClick={()=>handleCourse(topCourse._id)}
            className="cursor-pointer group"
            >
            <img
                src={topCourse.thumbnail || "/default-thumbnail.jpg"}
                alt={topCourse.title}
                className="w-full md:w-1/2 h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {topCourse.title}
            </h2>
            <p className="text-gray-600 mb-3">{topCourse.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <p className="text-yellow-500 font-semibold text-lg">
              ⭐ {topCourse.avgRating.toFixed(1)} / 5
            </p>
            <p className="text-sm text-gray-700">
              👨‍🏫 <span className="font-semibold">Creator:</span>{" "}
              {topCourse.creator?.name || "Unknown"}
            </p>
            <div className="flex flex-wrap gap-2">
              {topCourse.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Other Courses */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherCourses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
          >
            <img
              src={course.thumbnail || "/default-thumbnail.jpg"}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {course.title}
              </h3>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {course.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-yellow-500 font-semibold">
                  ⭐ {course.avgRating.toFixed(1)}
                </p>
                <div className="flex flex-wrap gap-1">
                  {course.tags?.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;