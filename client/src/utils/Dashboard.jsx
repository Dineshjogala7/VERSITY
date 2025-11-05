import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, BookOpen, Users, Award, ShoppingCart, TrendingDown } from "lucide-react";
import { useCourse } from "../CourseContext/CourseContext";
import axios from "axios";

const Dashboard = () => {
    const [userCourses, setUserCourses] = useState([]);
    const { enrolledData: enrolledCourses } = useCourse();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                const res = await axios.get(`${import.meta.env.VITE_API_URL}course/getusercourse`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserCourses(res.data.userCourses);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Calculate statistics
    const totalRevenue = userCourses.reduce((sum, course) =>
        sum + (course.price * course.totalStudentsEnrolled), 0
    );

    const totalExpenses = enrolledCourses?.reduce((sum, enrollment) =>
        sum + (enrollment.courseid?.price || 0), 0
    );

    const totalStudents = userCourses.reduce((sum, course) =>
        sum + course.totalStudentsEnrolled, 0
    );

    const avgRating = userCourses.length > 0
        ? (userCourses.reduce((sum, course) => sum + course.avgRating, 0) / userCourses.length).toFixed(1)
        : 0;

    const netProfit = totalRevenue - totalExpenses;

    // Prepare data for charts
    const revenueByCategory = userCourses.reduce((acc, course) => {
        const category = course.category || 'Uncategorized';
        const revenue = course.price * course.totalStudentsEnrolled;
        acc[category] = (acc[category] || 0) + revenue;
        return acc;
    }, {});

    const categoryData = Object.entries(revenueByCategory).map(([name, value]) => ({
        name,
        revenue: value
    }));

    const courseRevenueData = userCourses.map(course => ({
        name: course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title,
        revenue: course.price * course.totalStudentsEnrolled,
        students: course.totalStudentsEnrolled,
        rating: course.avgRating
    }));

    const COLORS = ['#facc15', '#fbbf24', '#f59e0b', '#eab308', '#ca8a04'];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-2xl text-yellow-400 font-black tracking-wider">LOADING DASHBOARD</p>
                    <p className="text-gray-400 mt-2">Crunching the numbers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 relative">
                    <div className="absolute inset-0 flex items-center justify-start opacity-5">
                        <span className="text-9xl font-black">DATA</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 mb-2 tracking-tight relative">
                        DASHBOARD
                    </h1>
                    <p className="text-gray-400 text-lg font-bold uppercase tracking-wider relative">
                        Track Performance • Monitor Growth
                    </p>
                    <div className="w-32 h-1 bg-yellow-400 mt-4"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 p-6 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-yellow-400 p-3">
                                <DollarSign className="text-black" size={28} strokeWidth={3} />
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Revenue</p>
                                <p className="text-3xl font-black text-white">₹{totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
                    </div>

                    <div className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 p-6 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-yellow-400 p-3">
                                <Users className="text-black" size={28} strokeWidth={3} />
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Students</p>
                                <p className="text-3xl font-black text-white">{totalStudents}</p>
                            </div>
                        </div>
                        <div className="h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
                    </div>

                    <div className="bg-zinc-900 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 p-6 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-yellow-400 p-3">
                                <Award className="text-black" size={28} strokeWidth={3} />
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Avg Rating</p>
                                <p className="text-3xl font-black text-white">{avgRating} ⭐</p>
                            </div>
                        </div>
                        <div className="h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500"></div>
                    </div>

                    <div className="bg-zinc-900 border-2 border-slate-700 hover:border-red-500 transition-all duration-300 p-6 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-red-500 p-3">
                                <ShoppingCart className="text-white" size={28} strokeWidth={3} />
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Expenses</p>
                                <p className="text-3xl font-black text-white">₹{totalExpenses.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="h-1 bg-red-500 w-0 group-hover:w-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Net Profit Banner */}
                <div className="mb-8 bg-gradient-to-r from-yellow-400 to-yellow-500 border-4 border-yellow-400 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 text-9xl font-black text-black/5 leading-none">
                        ₹
                    </div>
                    <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest text-black/70 mb-2">
                                Net Profit
                            </p>
                            <p className="text-5xl md:text-6xl font-black text-black">
                                ₹{netProfit.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {netProfit >= 0 ? (
                                <div className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 font-black uppercase">
                                    <TrendingUp size={32} strokeWidth={3} />
                                    <span className="text-xl">PROFIT</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-black uppercase">
                                    <TrendingDown size={32} strokeWidth={3} />
                                    <span className="text-xl">LOSS</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Revenue by Course */}
                    <div className="bg-zinc-900 border-2 border-slate-700 p-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-yellow-400">
                            <div className="bg-yellow-400 p-2">
                                <TrendingUp size={24} className="text-black" strokeWidth={3} />
                            </div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                Revenue by Course
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={courseRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis 
                                    dataKey="name" 
                                    angle={-45} 
                                    textAnchor="end" 
                                    height={100} 
                                    stroke="#94a3b8"
                                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <YAxis 
                                    stroke="#94a3b8"
                                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#18181b', 
                                        border: '2px solid #facc15',
                                        borderRadius: '0',
                                        fontWeight: 'bold'
                                    }}
                                    labelStyle={{ color: '#facc15' }}
                                />
                                <Legend 
                                    wrapperStyle={{ fontWeight: 'bold' }}
                                />
                                <Bar dataKey="revenue" fill="#facc15" name="Revenue (₹)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Revenue by Category */}
                    <div className="bg-zinc-900 border-2 border-slate-700 p-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-yellow-400">
                            <div className="bg-yellow-400 p-2">
                                <BookOpen size={24} className="text-black" strokeWidth={3} />
                            </div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                Revenue by Category
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="revenue"
                                    stroke="#18181b"
                                    strokeWidth={2}
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#18181b', 
                                        border: '2px solid #facc15',
                                        borderRadius: '0',
                                        fontWeight: 'bold'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Course Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Uploaded Courses */}
                    <div className="bg-zinc-900 border-2 border-slate-700 overflow-hidden">
                        <div className="bg-yellow-400 px-6 py-4">
                            <h2 className="text-xl font-black text-black uppercase tracking-tight">Your Courses</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-yellow-400">
                                        <th className="text-left py-4 px-4 text-yellow-400 font-black uppercase text-xs">Course</th>
                                        <th className="text-right py-4 px-4 text-yellow-400 font-black uppercase text-xs">Students</th>
                                        <th className="text-right py-4 px-4 text-yellow-400 font-black uppercase text-xs">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userCourses.length > 0 ? (
                                        userCourses.map((course) => (
                                            <tr key={course._id} className="border-b border-slate-700 hover:bg-slate-800 transition-colors">
                                                <td className="py-4 px-4">
                                                    <p className="font-bold text-white">{course.title}</p>
                                                    <p className="text-sm text-gray-400 font-semibold">₹{course.price}</p>
                                                </td>
                                                <td className="text-right py-4 px-4 text-white font-bold">
                                                    {course.totalStudentsEnrolled}
                                                </td>
                                                <td className="text-right py-4 px-4 font-black text-green-400">
                                                    ₹{(course.price * course.totalStudentsEnrolled).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-8 text-center text-gray-500 font-bold">
                                                NO COURSES YET
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Enrolled Courses */}
                    <div className="bg-zinc-900 border-2 border-slate-700 overflow-hidden">
                        <div className="bg-red-500 px-6 py-4">
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">Enrolled Courses</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-red-500">
                                        <th className="text-left py-4 px-4 text-red-400 font-black uppercase text-xs">Course</th>
                                        <th className="text-right py-4 px-4 text-red-400 font-black uppercase text-xs">Instructor</th>
                                        <th className="text-right py-4 px-4 text-red-400 font-black uppercase text-xs">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolledCourses.length > 0 ? (
                                        enrolledCourses.map((enrollment) => (
                                            <tr key={enrollment._id} className="border-b border-slate-700 hover:bg-slate-800 transition-colors">
                                                <td className="py-4 px-4">
                                                    <p className="font-bold text-white">
                                                        {enrollment.courseid?.title || 'N/A'}
                                                    </p>
                                                    <p className="text-sm text-gray-400 font-semibold">
                                                        {enrollment.courseid?.category}
                                                    </p>
                                                </td>
                                                <td className="text-right py-4 px-4 text-white font-bold">
                                                    {enrollment.courseid?.creator?.userName || 'Unknown'}
                                                </td>
                                                <td className="text-right py-4 px-4 font-black text-red-400">
                                                    ₹{(enrollment.courseid?.price || 0).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-8 text-center text-gray-500 font-bold">
                                                NO ENROLLMENTS YET
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;