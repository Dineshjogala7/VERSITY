import { useState } from "react";
import axios from "axios";
import { Brain, Trophy, RotateCcw } from "lucide-react";

const Quiz = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuiz = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic first!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}review/getquiz`,
        { topic },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data && res.data.questions) {
        
        setQuestions(res.data.questions);
        setCompleted(false);
        setScore(0);
        setCurrentIndex(0);
      } else {
        alert("No quiz data received.");
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
      alert("Failed to fetch quiz questions.");
    } finally {
      setLoading(false);
    }
  };

  // FRONTEND: Inside the Quiz component

const handleAnswer = (optionKey) => {
    const current = questions[currentIndex];
    
    // 💡 ROBUST FIX: Normalize both values for a reliable comparison 
    // (handles potential "D " vs "D" or "d" vs "D" issues from LLM)
    const normalizedOptionKey = String(optionKey).toUpperCase().trim();
    const normalizedCorrectAnswer = String(current.correctAnswer).toUpperCase().trim();
    
    const isCorrect = normalizedOptionKey === normalizedCorrectAnswer;
    const isLastQuestion = currentIndex + 1 >= questions.length;

    // Update score if correct
    // This functional update is correct and robust against race conditions
    if (isCorrect) {
        setScore(prevScore => prevScore + 1);
    }

    // Move to next question or complete quiz
    if (isLastQuestion) {
        setCompleted(true);
    } else {
        setCurrentIndex(prev => prev + 1);
    }
};
  const resetQuiz = () => {
    setQuestions([]);
    setCompleted(false);
    setScore(0);
    setCurrentIndex(0);
    setTopic("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-2xl text-yellow-400 font-black tracking-wider">GENERATING QUIZ</p>
          <p className="text-gray-400 mt-2 font-bold">Preparing your questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 relative">
          <div className="absolute inset-0 flex items-center justify-start opacity-5">
            <span className="text-9xl font-black">QUIZ</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 mb-2 tracking-tight relative flex items-center gap-4">
            <Brain size={56} className="text-yellow-400" strokeWidth={3} />
            AI QUIZ
          </h1>
          <p className="text-gray-400 text-lg font-bold uppercase tracking-wider relative">
            Test Your Knowledge • Challenge Yourself
          </p>
          <div className="w-32 h-1 bg-yellow-400 mt-4"></div>
        </div>

        {/* Topic Input */}
        {!questions.length && !loading && (
          <div className="bg-zinc-900 border-2 border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-yellow-400">
              <div className="bg-yellow-400 p-2">
                <Brain size={24} className="text-black" strokeWidth={3} />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Choose Your Topic
              </h2>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ENTER QUIZ TOPIC..."
              className="w-full bg-slate-800 border-2 border-slate-700 text-white px-6 py-4 mb-6 font-bold uppercase tracking-wide focus:border-yellow-400 focus:outline-none transition-colors"
            />
            <button
              onClick={fetchQuiz}
              className="w-full bg-yellow-400 text-black px-8 py-4 font-black uppercase tracking-wider hover:bg-yellow-500 transition-all duration-300 border-2 border-yellow-400"
            >
              Generate Quiz
            </button>
          </div>
        )}

        {/* Quiz Questions */}
        {!loading && questions.length > 0 && !completed && (
          <div className="bg-zinc-900 border-2 border-slate-700">
            {/* Progress Bar */}
            <div className="bg-slate-800 p-4 border-b-2 border-yellow-400">
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-400 font-black uppercase text-sm">
                  Question {currentIndex + 1} / {questions.length}
                </span>
                <span className="text-green-400 font-black uppercase text-sm">
                  Score: {score}
                </span>
              </div>
              <div className="w-full bg-slate-700 h-2">
                <div 
                  className="bg-yellow-400 h-2 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="p-8">
              <h2 className="text-2xl font-black text-white mb-8 leading-tight">
                {questions[currentIndex].question}
              </h2>
              
              <div className="space-y-3">
                {Object.entries(questions[currentIndex].options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswer(key)}
                    className="w-full text-left bg-slate-800 border-2 border-slate-700 p-5 hover:border-yellow-400 hover:bg-slate-700 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="bg-yellow-400 text-black font-black px-4 py-2 text-lg group-hover:bg-yellow-500 transition-colors">
                        {key}
                      </span>
                      <span className="text-white font-bold flex-1">{value}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {completed && (
          <div className="bg-zinc-900 border-2 border-slate-700 p-8">
            <div className="text-center">
              <div className="inline-block bg-yellow-400 p-6 mb-6">
                <Trophy size={64} className="text-black" strokeWidth={3} />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
                Quiz Completed!
              </h2>
              
              <div className="bg-slate-800 border-2 border-yellow-400 p-8 mb-8">
                <p className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-2">
                  Your Score
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-6xl md:text-7xl font-black text-yellow-400">
                    {score}
                  </span>
                  <span className="text-4xl md:text-5xl font-black text-white">
                    / {questions.length}
                  </span>
                </div>
                <div className="text-3xl font-black text-green-400">
                  {Math.round((score / questions.length) * 100)}%
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="bg-yellow-400 text-black px-8 py-4 font-black uppercase tracking-wider hover:bg-yellow-500 transition-all duration-300 border-2 border-yellow-400 inline-flex items-center gap-3"
              >
                <RotateCcw size={24} strokeWidth={3} />
                Try Another Topic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;