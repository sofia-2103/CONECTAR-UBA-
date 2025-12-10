import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { chatWithTutor, generateStudyPlan } from '../services/geminiService';
import { Course } from '../types';

interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    activeCourse?: Course | null;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, activeCourse }) => {
    const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
        { role: 'model', text: '¡Hola! Soy tu tutor UBA. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Initial context trigger if a course is selected
    useEffect(() => {
        if (isOpen && activeCourse) {
            handleGeneratePlan(activeCourse);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, activeCourse]);

    const handleGeneratePlan = async (course: Course) => {
        setIsLoading(true);
        setMessages(prev => [...prev, { role: 'user', text: `Generame un plan de estudio para ${course.title}` }]);
        
        const plan = await generateStudyPlan(course.title);
        
        setMessages(prev => [...prev, { role: 'model', text: plan }]);
        setIsLoading(false);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Format history for Gemini API
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const streamResult = await chatWithTutor(userMsg, history);
            
            let fullResponse = "";
            setMessages(prev => [...prev, { role: 'model', text: "" }]); // Placeholder

            for await (const chunk of streamResult.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                
                // Update last message with accumulating text
                setMessages(prev => {
                    const newArr = [...prev];
                    newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
                    return newArr;
                });
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un problema de conexión. Intenta de nuevo." }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>

            {/* Modal */}
            <div className="bg-gray-50 w-full max-w-md h-[85vh] sm:h-[600px] rounded-t-[40px] sm:rounded-[40px] shadow-2xl flex flex-col pointer-events-auto transform transition-transform duration-300 ease-out overflow-hidden">
                
                {/* Header */}
                <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Bot className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Tutor UBA IA</h3>
                            <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                En línea
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-800' : 'bg-yellow-400'}`}>
                                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Sparkles size={16} className="text-white" />}
                            </div>
                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-slate-800 text-white rounded-tr-none' 
                                : 'bg-white text-slate-600 shadow-sm border border-gray-100 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                                <Bot size={16} className="text-white" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-2 items-center">
                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full pr-2">
                        <input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Pregunta sobre materias, fechas..."
                            className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-slate-800 placeholder-gray-400"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};