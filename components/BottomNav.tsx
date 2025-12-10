import React from 'react';
import { Home, Calendar, BookOpen, User } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
    currentView: ViewState;
    onChangeView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
    const navItems = [
        { id: ViewState.HOME, icon: Home, label: 'Inicio' },
        { id: ViewState.DATES, icon: Calendar, label: 'Fechas' },
        { id: ViewState.COURSES, icon: BookOpen, label: 'Cursos' },
        { id: ViewState.PROFILE, icon: User, label: 'Perfil' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 px-6 py-4 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] dark:shadow-none z-50 max-w-md mx-auto transition-colors duration-300">
            <div className="flex justify-between items-center">
                {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onChangeView(item.id)}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-yellow-500 dark:text-yellow-400 -translate-y-1' : 'text-gray-400 dark:text-gray-500'}`}
                        >
                            <item.icon 
                                size={24} 
                                strokeWidth={isActive ? 2.5 : 2}
                                className={isActive ? 'drop-shadow-sm' : ''}
                            />
                            {isActive && (
                                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
                            )}
                            {!isActive && (
                                <div className="h-1 w-1 rounded-full bg-transparent mt-1"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};