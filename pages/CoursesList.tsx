import React, { useState } from 'react';
import { Course } from '../types';
import { PlayCircle, Award, MoreVertical } from 'lucide-react';

interface CoursesListProps {
    courses: Course[];
    onOpenAi: (course: Course) => void;
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses, onOpenAi }) => {
    const [filter, setFilter] = useState('Todos');
    const categories = ['Todos', 'CBC', 'Grado', 'Idiomas'];

    const filteredCourses = filter === 'Todos' 
        ? courses 
        : courses.filter(c => c.category === filter);

    return (
        <div className="pb-24 pt-6 px-6 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Mis Cursos</h1>

            {/* Categories Filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                            filter === cat 
                            ? 'bg-slate-800 text-white shadow-lg shadow-slate-200 dark:bg-white dark:text-slate-900 dark:shadow-none' 
                            : 'bg-white dark:bg-slate-800 text-gray-400 border border-gray-100 dark:border-slate-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Vertical List */}
            <div className="space-y-4">
                {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white dark:bg-slate-800 rounded-[32px] p-4 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
                        <div className="flex gap-4">
                            <div className={`w-24 h-24 rounded-2xl ${course.color} relative overflow-hidden flex-shrink-0`}>
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                            </div>
                            <div className="flex-1 py-1">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-md">
                                        {course.category}
                                    </span>
                                    <button className="text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                                <h3 className="font-bold text-slate-800 dark:text-white mt-1 mb-1 leading-tight">{course.title}</h3>
                                
                                <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 mb-2 overflow-hidden">
                                    <div 
                                        className="bg-yellow-400 h-full rounded-full" 
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-400 font-medium">{course.progress}% completado</span>
                                    <button 
                                        onClick={() => onOpenAi(course)}
                                        className="bg-slate-800 dark:bg-slate-700 text-white p-2 rounded-xl active:scale-95 transition-transform flex items-center gap-1 text-xs font-bold px-3 shadow-lg shadow-slate-200 dark:shadow-none"
                                    >
                                        <Award size={14} />
                                        <span>Plan IA</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};