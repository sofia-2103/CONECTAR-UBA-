import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen'; // Import Login
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { ImportantDates } from './pages/ImportantDates';
import { CoursesList } from './pages/CoursesList';
import { Profile } from './pages/Profile';
import { AIAssistant } from './components/AIAssistant';
import { Course, ImportantDate, ViewState, UserProfile } from './types';

// Mock Data
const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Análisis Matemático II',
        category: 'Grado',
        progress: 65,
        lessons: 24,
        color: 'bg-orange-100',
        image: 'https://picsum.photos/200/200?random=1'
    },
    {
        id: '2',
        title: 'Física I',
        category: 'CBC',
        progress: 30,
        lessons: 32,
        color: 'bg-blue-100',
        image: 'https://picsum.photos/200/200?random=2'
    },
    {
        id: '3',
        title: 'Inglés Técnico',
        category: 'Idiomas',
        progress: 90,
        lessons: 12,
        color: 'bg-purple-100',
        image: 'https://picsum.photos/200/200?random=3'
    },
    {
        id: '4',
        title: 'Sociedad y Estado',
        category: 'CBC',
        progress: 10,
        lessons: 18,
        color: 'bg-green-100',
        image: 'https://picsum.photos/200/200?random=4'
    }
];

// Helper to get a date string for the current month/year + offset days
const getMockDate = (dayOffset: number, monthOffset: number = 0) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    date.setDate(date.getDate() + dayOffset);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Helper to get fixed date in current month
const getFixedDate = (day: number, monthOffset: number = 0) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    date.setDate(day);
    return date.toISOString().split('T')[0];
};

const MOCK_DATES: ImportantDate[] = [
    {
        id: '1',
        title: 'Parcial de Análisis II',
        date: getMockDate(2), // In 2 days
        type: 'exam',
        description: 'Aula 302, Pabellón 1. 18:00hs'
    },
    {
        id: '2',
        title: 'Entrega TP Física',
        date: getMockDate(5), // In 5 days
        type: 'administrative',
        description: 'Subir al campus antes de las 23:59.'
    },
    {
        id: '3',
        title: 'Feriado Nacional',
        date: getFixedDate(25), // 25th of this month
        type: 'holiday',
        description: 'No hay clases ni actividades administrativas.'
    },
    {
        id: '4',
        title: 'Final de Inglés',
        date: getFixedDate(10, 1), // 10th of NEXT month
        type: 'exam',
        description: 'Sede Drago, Aula 12. 09:00hs'
    },
    {
        id: '5',
        title: 'Inscripción Materias',
        date: getFixedDate(15, 1), // 15th of NEXT month
        type: 'administrative',
        description: 'Inscripción para curso de verano.'
    }
];

const App: React.FC = () => {
    // 1. Initialize User from LocalStorage
    const [user, setUser] = useState<UserProfile | null>(() => {
        const savedUser = localStorage.getItem('user_profile');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 2. Determine Initial View based on user existence
    const [view, setView] = useState<ViewState>(() => {
        return user ? ViewState.HOME : ViewState.WELCOME;
    });

    // 3. Theme State
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [isAiOpen, setIsAiOpen] = useState(false);
    const [selectedCourseForAi, setSelectedCourseForAi] = useState<Course | null>(null);

    // Save to localStorage whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user_profile', JSON.stringify(user));
        }
    }, [user]);

    // Handle Start button from Welcome Screen
    const handleStartWelcome = () => {
        setView(ViewState.LOGIN);
    };

    // Handle Login Submit
    const handleLogin = (newUser: UserProfile) => {
        setUser(newUser);
        setView(ViewState.HOME);
    };

    const handleUpdateUser = (updatedUser: UserProfile) => {
        setUser(updatedUser);
    };

    const handleOpenAiWithCourse = (course: Course) => {
        setSelectedCourseForAi(course);
        setIsAiOpen(true);
    };

    const renderContent = () => {
        switch (view) {
            case ViewState.LOGIN:
                return <LoginScreen onLogin={handleLogin} />;
            case ViewState.HOME:
                return user ? <Home courses={MOCK_COURSES} onCourseClick={handleOpenAiWithCourse} userName={user.name} /> : null;
            case ViewState.DATES:
                return <ImportantDates dates={MOCK_DATES} />;
            case ViewState.COURSES:
                return <CoursesList courses={MOCK_COURSES} onOpenAi={handleOpenAiWithCourse} />;
            case ViewState.PROFILE:
                return user ? (
                    <Profile 
                        user={user} 
                        onUpdateUser={handleUpdateUser} 
                        isDarkMode={isDarkMode}
                        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                ) : null;
            default:
                return null;
        }
    };

    // Determine if we should show the bottom nav (only when logged in and not in welcome/login)
    const showBottomNav = user && view !== ViewState.WELCOME && view !== ViewState.LOGIN;

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="max-w-md mx-auto bg-gray-50 dark:bg-slate-900 h-screen relative shadow-2xl overflow-hidden font-sans text-slate-800 dark:text-gray-100 transition-colors duration-300">
                {view === ViewState.WELCOME ? (
                    <WelcomeScreen onStart={handleStartWelcome} />
                ) : (
                    <>
                        <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
                            {renderContent()}
                        </div>
                        
                        {showBottomNav && (
                            <BottomNav currentView={view} onChangeView={setView} />
                        )}
                        
                        <AIAssistant 
                            isOpen={isAiOpen} 
                            onClose={() => setIsAiOpen(false)} 
                            activeCourse={selectedCourseForAi}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;