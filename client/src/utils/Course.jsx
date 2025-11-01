import { BookOpen, Users, Star, Calendar, Tag, FileText, Video, Download, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCourse } from "../CourseContext/CourseContext";

const Course = () => {
  const { courseid } = useParams();
  const { enrolledData } = useCourse();
  const enrollmentData = enrolledData.find((data) => data.courseid._id === courseid);
  
  if (!enrollmentData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl text-gray-700">Course not found</h2>
      </div>
    );
  }

  // Extract course details from the nested courseid object
  const {
    title,
    description,
    price,
    thumbnail,
    avgRating,
    ratingsCount,
    totalStudentsEnrolled,
    category,
    tags,
    videos,
    pdfs,
    articles,
    createdAt,
    updatedAt,
  } = enrollmentData.courseid;

  // Extract enrollment details
  const { paymentStatus, liked, completed } = enrollmentData;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Course Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="inline-block px-4 py-1 bg-purple-500/20 rounded-full text-sm font-medium border border-purple-400/30">
                {category}
              </div>
              {/* Enrolled Badge */}
              <div className="inline-block px-4 py-1 bg-green-500/20 rounded-full text-sm font-medium border border-green-400/30">
                ✓ Enrolled
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h1>

            <p className="text-lg text-gray-300">{description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{avgRating}</span>
                <span className="text-gray-300">
                  ({ratingsCount.toLocaleString()} ratings)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{totalStudentsEnrolled.toLocaleString()} students</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Updated Date */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Last updated {formatDate(updatedAt)}</span>
            </div>
          </div>

          {/* Right: Thumbnail & Price Card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Floating Progress Card (since already enrolled) */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-sm">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Your Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: completed ? '100%' : '0%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {completed ? 'Course Completed! 🎉' : 'Just getting started'}
                  </p>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                  {completed ? 'Review Course' : 'Continue Learning'}
                </button>
                <p className="text-xs text-gray-500">
                  Payment Status: <span className="font-semibold text-green-600">{paymentStatus}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {articles?.map((article, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{article.title}</p>
                      <p className="text-sm text-gray-600">{article.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Content
              </h2>

              {/* Videos */}
              {videos && videos.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Video className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-lg">
                      Video Lectures ({videos.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {videos.map((video, i) => (
                      <a
                        key={i}
                        href={video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Video className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="text-gray-700 font-medium">
                            Video Lecture {i + 1}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* PDFs */}
              {pdfs && pdfs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-lg">
                      Downloadable Resources ({pdfs.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {pdfs.map((pdf, i) => (
                      <a
                        key={i}
                        href={pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="text-gray-700 font-medium">
                            Resource {i + 1}.pdf
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Articles/Lessons */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Articles
              </h2>
              <div className="space-y-4">
                {articles?.map((article, i) => (
                  <div
                    key={i}
                    className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600">{article.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Course Features */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4">This course includes:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Video className="w-5 h-5 text-purple-600" />
                  <span>{videos?.length || 0} video lectures</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span>{pdfs?.length || 0} downloadable resources</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span>{articles?.length || 0} articles</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Certificate of completion</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <button 
                  className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ${
                    liked 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {liked ? '❤️ Liked' : '🤍 Add to Favorites'}
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300">
                  Share this course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;