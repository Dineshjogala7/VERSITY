import { useState } from "react";
import { X, Plus, FileText, Video, Image, Trash2 } from "lucide-react";

const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        tags: "",
    });

    const [videos, setVideos] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [articles, setArticles] = useState([{ title: "", content: "" }]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileUpload = (e, type) => {
        const files = Array.from(e.target.files);
        
        if (type === "video") {
            if (videos.length + files.length > 5) {
                alert("You can upload maximum 5 videos");
                return;
            }
            setVideos(prev => [...prev, ...files]);
        } else if (type === "pdf") {
            if (pdfs.length + files.length > 5) {
                alert("You can upload maximum 5 PDFs");
                return;
            }
            setPdfs(prev => [...prev, ...files]);
        } else if (type === "thumbnail") {
            setThumbnail(files[0]);
        }
    };

    const removeFile = (index, type) => {
        if (type === "video") {
            setVideos(prev => prev.filter((_, i) => i !== index));
        } else if (type === "pdf") {
            setPdfs(prev => prev.filter((_, i) => i !== index));
        } else if (type === "thumbnail") {
            setThumbnail(null);
        }
    };

    const handleArticleChange = (index, field, value) => {
        const newArticles = [...articles];
        newArticles[index][field] = value;
        setArticles(newArticles);
    };

    const addArticle = () => {
        setArticles(prev => [...prev, { title: "", content: "" }]);
    };

    const removeArticle = (index) => {
        if (articles.length > 1) {
            setArticles(prev => prev.filter((_, i) => i !== index));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";
        if (!formData.tags.trim()) newErrors.tags = "At least one tag is required";
        if (!thumbnail) newErrors.thumbnail = "Thumbnail is required";
        if (videos.length === 0) newErrors.videos = "At least one video is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            const data = new FormData();
            data.append('title', formData.title);
            data.append('price', formData.price);
            data.append('description', formData.description);
            data.append('category', formData.category);
            
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            data.append('tags', JSON.stringify(tagsArray));
            
            const validArticles = articles.filter(article => article.title.trim() && article.content.trim());
            if (validArticles.length > 0) {
                data.append('articles', JSON.stringify(validArticles));
            }
            
            videos.forEach(video => data.append('videos', video));
            pdfs.forEach(pdf => data.append('pdfs', pdf));
            if (thumbnail) data.append('thumbnail', thumbnail);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}course/addcourse`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            toast.success('Course added successfully!');
            
            setFormData({
                title: "",
                price: "",
                description: "",
                category: "",
                tags: "",
            });
            setVideos([]);
            setPdfs([]);
            setThumbnail(null);
            setArticles([{ title: "", content: "" }]);
            
        } catch (error) {
            console.error('Error adding course:', error);
            alert(error.response?.data?.message || 'Failed to add course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10 relative">
                    <div className="absolute inset-0 flex items-center justify-start opacity-5">
                        <span className="text-9xl font-black">NEW</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 mb-2 tracking-tight relative">
                        ADD COURSE
                    </h1>
                    <p className="text-gray-400 text-lg font-bold uppercase tracking-wider relative">
                        Create New Course • Share Knowledge
                    </p>
                    <div className="w-32 h-1 bg-yellow-400 mt-4"></div>
                </div>

                <div className="bg-zinc-900 border-2 border-slate-700 p-8">
                    <div className="space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div className="bg-yellow-400 px-4 py-3 -mx-8 -mt-8 mb-6">
                                <h2 className="text-xl font-black text-black uppercase tracking-tight">Basic Information</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-yellow-400 uppercase tracking-wider mb-2">
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 text-white font-bold focus:border-yellow-400 focus:outline-none transition-colors"
                                    placeholder="e.g., React Full Course"
                                />
                                {errors.title && <p className="text-red-400 text-sm mt-2 font-bold">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-black text-yellow-400 uppercase tracking-wider mb-2">
                                        Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 text-white font-bold focus:border-yellow-400 focus:outline-none transition-colors"
                                        placeholder="499"
                                    />
                                    {errors.price && <p className="text-red-400 text-sm mt-2 font-bold">{errors.price}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-black text-yellow-400 uppercase tracking-wider mb-2">
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 text-white font-bold focus:border-yellow-400 focus:outline-none transition-colors"
                                        placeholder="Web Development"
                                    />
                                    {errors.category && <p className="text-red-400 text-sm mt-2 font-bold">{errors.category}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-yellow-400 uppercase tracking-wider mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 text-white font-bold focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                                    placeholder="Learn React from scratch with projects"
                                />
                                {errors.description && <p className="text-red-400 text-sm mt-2 font-bold">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-black text-yellow-400 uppercase tracking-wider mb-2">
                                    Tags * (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 text-white font-bold focus:border-yellow-400 focus:outline-none transition-colors"
                                    placeholder="react, frontend, javascript"
                                />
                                {errors.tags && <p className="text-red-400 text-sm mt-2 font-bold">{errors.tags}</p>}
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="border-t-2 border-slate-700 pt-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-yellow-400 p-2">
                                    <Image size={24} className="text-black" strokeWidth={3} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Course Thumbnail *</h3>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 hover:border-yellow-400 cursor-pointer transition-colors bg-slate-800/50">
                                    <div className="text-center">
                                        <Image className="mx-auto mb-2 text-gray-400" size={32} strokeWidth={3} />
                                        <span className="text-sm text-gray-400 font-bold uppercase">Click to upload thumbnail</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "thumbnail")}
                                        className="hidden"
                                    />
                                </label>
                                {thumbnail && (
                                    <div className="flex items-center justify-between bg-slate-800 border-2 border-yellow-400 p-4">
                                        <span className="text-sm text-white font-bold truncate">{thumbnail.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(0, "thumbnail")}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <X size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                )}
                                {errors.thumbnail && <p className="text-red-400 text-sm font-bold">{errors.thumbnail}</p>}
                            </div>
                        </div>

                        {/* Video Upload */}
                        <div className="border-t-2 border-slate-700 pt-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-yellow-400 p-2">
                                    <Video size={24} className="text-black" strokeWidth={3} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Course Videos * (Max 5)</h3>
                            </div>
                            <div className="space-y-3">
                                {videos.length < 5 && (
                                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-700 hover:border-yellow-400 cursor-pointer transition-colors bg-slate-800/50">
                                        <div className="text-center">
                                            <Video className="mx-auto mb-2 text-gray-400" size={28} strokeWidth={3} />
                                            <span className="text-sm text-gray-400 font-bold uppercase">Upload video ({videos.length}/5)</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            multiple
                                            onChange={(e) => handleFileUpload(e, "video")}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                                {videos.map((video, index) => (
                                    <div key={index} className="flex items-center justify-between bg-slate-800 border-2 border-slate-700 hover:border-yellow-400 p-4 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Video size={20} className="text-yellow-400" strokeWidth={3} />
                                            <span className="text-sm text-white font-bold truncate">{video.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index, "video")}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <X size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                ))}
                                {errors.videos && <p className="text-red-400 text-sm font-bold">{errors.videos}</p>}
                            </div>
                        </div>

                        {/* PDF Upload */}
                        <div className="border-t-2 border-slate-700 pt-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-yellow-400 p-2">
                                    <FileText size={24} className="text-black" strokeWidth={3} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Course PDFs (Max 5)</h3>
                            </div>
                            <div className="space-y-3">
                                {pdfs.length < 5 && (
                                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-700 hover:border-yellow-400 cursor-pointer transition-colors bg-slate-800/50">
                                        <div className="text-center">
                                            <FileText className="mx-auto mb-2 text-gray-400" size={28} strokeWidth={3} />
                                            <span className="text-sm text-gray-400 font-bold uppercase">Upload PDF ({pdfs.length}/5)</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            multiple
                                            onChange={(e) => handleFileUpload(e, "pdf")}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                                {pdfs.map((pdf, index) => (
                                    <div key={index} className="flex items-center justify-between bg-slate-800 border-2 border-slate-700 hover:border-yellow-400 p-4 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <FileText size={20} className="text-yellow-400" strokeWidth={3} />
                                            <span className="text-sm text-white font-bold truncate">{pdf.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index, "pdf")}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <X size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Articles Section */}
                        <div className="border-t-2 border-slate-700 pt-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-yellow-400 p-2">
                                        <FileText size={24} className="text-black" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Articles</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={addArticle}
                                    className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-black uppercase hover:bg-yellow-300 transition-colors"
                                >
                                    <Plus size={18} strokeWidth={3} />
                                    Add Article
                                </button>
                            </div>
                            <div className="space-y-4">
                                {articles.map((article, index) => (
                                    <div key={index} className="border-2 border-slate-700 bg-slate-800/50 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-black text-yellow-400 uppercase tracking-wider">Article {index + 1}</span>
                                            {articles.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArticle(index)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash2 size={18} strokeWidth={3} />
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            value={article.title}
                                            onChange={(e) => handleArticleChange(index, "title", e.target.value)}
                                            placeholder="Article Title"
                                            className="w-full px-4 py-3 mb-3 bg-slate-800 border-2 border-slate-700 text-white font-bold focus:border-yellow-400 focus:outline-none transition-colors"
                                        />
                                        <textarea
                                            value={article.content}
                                            onChange={(e) => handleArticleChange(index, "content", e.target.value)}
                                            placeholder="Article Content"
                                            rows="3"
                                            className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 text-white font-bold focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="border-t-2 border-slate-700 pt-8">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-yellow-400 text-black py-4 font-black text-xl uppercase tracking-wider hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "ADDING COURSE..." : "ADD COURSE"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;