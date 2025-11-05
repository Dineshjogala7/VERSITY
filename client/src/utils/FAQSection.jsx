import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "Will I get a certificate after completing this course?",
      answer: "Yes! After completing all lessons and quizzes, you'll receive a verified certificate of completion that you can share on LinkedIn or your resume."
    },
    {
      question: "Do I get lifetime access to the course?",
      answer: "Absolutely. Once enrolled, you have lifetime access to all lessons, updates, and materials—no expiration or hidden fees."
    },
    {
      question: "Is this course beginner-friendly?",
      answer: "Yes. This course starts from the basics and gradually moves to advanced topics, making it ideal for both beginners and professionals who want to refresh their skills."
    },
    {
      question: "Can I access the course on mobile devices?",
      answer: "Yes! You can watch videos and access resources anytime using your phone, tablet, or laptop through our responsive platform."
    },
    {
      question: "What if I have questions during the course?",
      answer: "You can post your questions in the Q&A section under each lecture. The instructor or teaching assistants will respond promptly."
    },
    {
      question: "Are there any prerequisites for this course?",
      answer: "No prior experience is needed. A basic understanding of computers and a willingness to learn are enough to get started."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-16 pb-10 px-4">
      {/* Header */}
      <div className="mb-10 relative">
        <div className="absolute inset-0 flex items-center justify-start opacity-5">
          <span className="text-9xl font-black">FAQ</span>
        </div>
        <div className="flex items-center gap-4 mb-4 relative">
          <div className="bg-yellow-400 p-3">
            <MessageCircle className="text-black" size={32} strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 uppercase tracking-tight">
              FAQ
            </h2>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
              Common Questions Answered
            </p>
          </div>
        </div>
        <div className="w-32 h-1 bg-yellow-400"></div>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="border-2 border-slate-700 bg-zinc-900 hover:border-yellow-400 transition-colors"
          >
            <AccordionTrigger className="text-left px-6 py-4 text-white font-black uppercase tracking-tight hover:bg-slate-800 hover:text-yellow-400 transition-colors text-sm md:text-base">
              <span className="flex items-start gap-3">
                <span className="text-yellow-400 font-black flex-shrink-0">Q{index + 1}.</span>
                <span>{faq.question}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-gray-400 font-semibold border-t-2 border-slate-700 pt-4">
              <div className="flex gap-3">
                <span className="text-yellow-400 font-black flex-shrink-0">A.</span>
                <span>{faq.answer}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      
    </div>
  );
}