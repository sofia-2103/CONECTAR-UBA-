import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Calendar as CalendarIcon, Briefcase } from 'lucide-react';
import { ImportantDate } from '../types';

interface ImportantDatesProps {
    dates: ImportantDate[];
}

export const ImportantDates: React.FC<ImportantDatesProps> = ({ dates }) => {
    // State for the currently displayed month
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    const daysScrollRef = useRef<HTMLDivElement>(null);

    // Format for Header (e.g., "Noviembre 2024")
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate);
    
    // Capitalize first letter
    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Generate days for the visual strip
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            days.push({
                dayNumber: i,
                dayName: new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(dayDate).toUpperCase().slice(0, 2),
                fullDate: dayDate
            });
        }
        return days;
    };

    const daysList = getDaysInMonth(currentDate);

    // Filter events for current month
    const filteredEvents = dates.filter(event => {
        const eventDate = new Date(event.date + 'T00:00:00'); // Ensure TZ consistency
        return eventDate.getMonth() === currentDate.getMonth() && 
               eventDate.getFullYear() === currentDate.getFullYear();
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Auto-scroll to today if in current month
    useEffect(() => {
        if (currentDate.getMonth() === today.getMonth() && daysScrollRef.current) {
            const todayElement = document.getElementById(`day-${today.getDate()}`);
            if (todayElement) {
                todayElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentDate]);

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'exam': return 'bg-red-50 text-red-500 border-red-100 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400';
            case 'holiday': return 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-900/50 dark:text-green-400';
            case 'administrative': return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:border-purple-900/50 dark:text-purple-400';
            default: return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-400';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'exam': return <AlertCircle size={22} />;
            case 'holiday': return <CalendarIcon size={22} />;
            case 'administrative': return <Briefcase size={22} />;
            default: return <CalendarIcon size={22} />;
        }
    };

    return (
        <div className="pb-24 pt-6 px-6 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
             <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Calendario Académico</h1>

             {/* Month Selector */}
             <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm mb-6 flex justify-between items-center border border-gray-100 dark:border-slate-700">
                <button 
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors active:scale-95"
                >
                    <ChevronLeft size={20} className="text-slate-600 dark:text-gray-300" />
                </button>
                <span className="font-bold text-lg text-slate-800 dark:text-white">{formattedMonth}</span>
                <button 
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors active:scale-95"
                >
                    <ChevronRight size={20} className="text-slate-600 dark:text-gray-300" />
                </button>
             </div>

             {/* Days strip (Dynamic & Scrollable) */}
             <div 
                ref={daysScrollRef}
                className="flex gap-3 mb-8 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2"
             >
                 {daysList.map((dayObj) => {
                     const isToday = dayObj.fullDate.getDate() === today.getDate() && 
                                     dayObj.fullDate.getMonth() === today.getMonth() &&
                                     dayObj.fullDate.getFullYear() === today.getFullYear();

                     // Check if this day has an event
                     const hasEvent = filteredEvents.some(e => {
                         const d = new Date(e.date + 'T00:00:00');
                         return d.getDate() === dayObj.dayNumber;
                     });

                     return (
                        <div 
                            key={dayObj.dayNumber} 
                            id={`day-${dayObj.dayNumber}`}
                            className={`flex flex-col items-center gap-1 flex-shrink-0 min-w-[3rem] transition-all`}
                        >
                            <span className={`text-[10px] font-bold ${isToday ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500'}`}>
                                {dayObj.dayName}
                            </span>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-2xl text-sm font-bold transition-all relative ${
                                isToday 
                                ? 'bg-yellow-400 text-white shadow-md shadow-yellow-200 dark:shadow-none scale-110' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-300 border border-gray-100 dark:border-slate-700'
                            }`}>
                                {dayObj.dayNumber}
                                {hasEvent && !isToday && (
                                    <span className="absolute bottom-1 w-1 h-1 bg-red-400 rounded-full"></span>
                                )}
                            </div>
                        </div>
                     );
                 })}
             </div>

             {/* Events List */}
             <div className="space-y-4">
                 <h3 className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-2 flex justify-between items-center">
                    Eventos del Mes
                    <span className="bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-300 px-2 py-0.5 rounded-md text-[10px] font-bold">
                        {filteredEvents.length}
                    </span>
                 </h3>
                 
                 {filteredEvents.length > 0 ? (
                     filteredEvents.map((event) => {
                         const eventDate = new Date(event.date + 'T00:00:00');
                         const dayNumber = eventDate.getDate();
                         
                         return (
                            <div key={event.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4 hover:shadow-md transition-all active:scale-[0.98]">
                                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 ${getTypeStyles(event.type)}`}>
                                    <span className="text-xs font-bold leading-none mb-1 opacity-80">{event.type === 'exam' ? 'EXAM' : 'INFO'}</span>
                                    <span className="text-lg font-bold leading-none">{dayNumber}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{event.title}</h4>
                                    <p className="text-xs text-gray-400 dark:text-gray-400 mt-1 line-clamp-2">{event.description}</p>
                                </div>
                                <div className="text-gray-300 dark:text-gray-600">
                                    {getTypeIcon(event.type)}
                                </div>
                            </div>
                         );
                     })
                 ) : (
                     <div className="flex flex-col items-center justify-center py-10 opacity-50">
                         <CalendarIcon size={48} className="text-gray-300 dark:text-gray-600 mb-2" />
                         <p className="text-sm font-medium text-gray-400 dark:text-gray-500">No hay eventos este mes</p>
                     </div>
                 )}
             </div>
        </div>
    );
};