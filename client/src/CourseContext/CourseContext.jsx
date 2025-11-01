import { createContext, useContext, useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [enrolledData, setEnrolledData] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  
  // Fetch data ONCE in the provider (survives component remounts)
  const hasFetchedTopRated = useRef(false);
  const hasFetchedEnrolled = useRef(false);

  useEffect(() => {
    const fetchTopRatedCourses = async () => {
      // Prevent duplicate fetches
      if (hasFetchedTopRated.current) return;
      
      const token = localStorage.getItem("token");
      if (!token) return;

      hasFetchedTopRated.current = true;

      try {
        setLoading(true);
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}course/coursedetails/TopRated`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCoursesData(result.data.coursesData);
      } catch (error) {
        hasFetchedTopRated.current = false; // Reset on error
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedCourses();
  }, []); // Run once when provider mounts

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      // Prevent duplicate fetches
      if (hasFetchedEnrolled.current) return;
      
      const token = localStorage.getItem("token");
      if (!token) return;

      hasFetchedEnrolled.current = true;

      try {
        setLoading(true);
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}enroll/getenrolled`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const enrolledCourses = result.data.enrolledCourse || [];
        setEnrolledData(enrolledCourses);
        
        // Create a Set of enrolled course IDs for O(1) lookup
        const courseIds = new Set(
          enrolledCourses.map(enrollment => enrollment.courseid._id)
        );
        setEnrolledCourseIds(courseIds);
      } catch (error) {
        hasFetchedEnrolled.current = false; // Reset on error
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []); // Run once when provider mounts

  // Helper function to check if a course is enrolled
  const isEnrolled = (courseId) => {
    return enrolledCourseIds.has(courseId);
  };

  const value = useMemo(
    () => ({
      coursesData,
      setCoursesData,
      loading,
      setLoading,
      search,
      setSearch,
      enrolledData,
      setEnrolledData,
      enrolledCourseIds,
      isEnrolled,
    }),
    [coursesData, loading, search, enrolledData, enrolledCourseIds]
  );

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};