import React, { useState } from 'react';
import { Search, Bell, TrendingUp, Clock, Globe, FileText, Coffee, Building2, MapPin, Layers, Info } from 'lucide-react';
import { Course } from '../types';

interface HomeProps {
    courses: Course[];
    onCourseClick: (course: Course) => void;
    userName: string;
}

// Campus Data Structure
const CAMPUS_DATA = {
    pab3: {
        id: 'pab3',
        name: 'Pabellón 3 (FADU)',
        color: 'bg-orange-500',
        // Updated URL specifically for FADU location in Ciudad Universitaria (Corrected)
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.267568595919!2d-58.4456606842382!3d-34.54677649519159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb436efa018b3%3A0x6a01b63e0205df85!2sFADU%20-%20Facultad%20de%20Arquitectura%2C%20Dise%C3%B1o%20y%20Urbanismo%20(UBA)!5e0!3m2!1ses-419!2sar!4v1715875000000!5m2!1ses-419!2sar',
        floors: [
            { level: '4º Piso', desc: 'Talleres de Arquitectura (Aulas 401-420), Cátedras.' },
            { level: '3º Piso', desc: 'Talleres de Diseño, Mediateca, Aulas Teóricas.' },
            { level: 'Entrepi.', desc: 'Secretaría Académica, Biblioteca Central, Decanato.' },
            { level: 'PB', desc: 'Aula Magna, Bedelía, Bar Central, Patio Central.' },
            { level: 'Subsuelo', desc: 'Librería, Copiadora, Aulas (300-320), Comedor.' },
        ]
    },
    pab1: {
        id: 'pab1',
        name: 'Pabellón 1 (Exactas)',
        color: 'bg-blue-500',
        // Updated URL specifically for Pabellón 1 (Corrected)
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.307377543949!2d-58.44717192361763!3d-34.54576825445214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb4340d890049%3A0x1d75f28456108157!2sPabell%C3%B3n%201%20(FCEN-UBA)!5e0!3m2!1ses-419!2sar!4v1715875100000!5m2!1ses-419!2sar',
        floors: [
            { level: '2º Piso', desc: 'Departamentos de Física, Aulas de Computación.' },
            { level: '1º Piso', desc: 'Aulas Magna, Laboratorios de Investigación.' },
            { level: 'PB', desc: 'Entrada Principal, Aulas Generales, Bar.' },
        ]
    }
};

export const Home: React.FC<HomeProps> = ({ courses, onCourseClick, userName }) => {
    
    // Split name to get first name
    const firstName = userName.split(' ')[0];
    const [selectedPabellon, setSelectedPabellon] = useState<'pab3' | 'pab1'>('pab3');

    const quickActions = [
        { 
            icon: Globe, 
            label: 'SIU', 
            color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            url: 'https://guarani.uba.ar/cbc/acceso'
        },
        { 
            icon: Building2, 
            label: 'Campus', 
            color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            url: 'https://ubaxxi.uba.ar/'
        },
        { 
            icon: FileText, 
            label: 'Trámites', 
            color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
            url: 'https://tramitesadistancia.uba.ar/tramitesadistancia/tad-publico'
        },
        { 
            icon: Coffee, 
            label: 'Menú', 
            color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            url: '#' 
        },
    ];

    const news = [
        { id: 1, title: 'Inscripciones abiertas', subtitle: '2do Cuatrimestre', color: 'bg-slate-800 text-white dark:bg-gray-700' },
        { id: 2, title: 'Becas Sarmiento', subtitle: 'Fecha límite: 20 Oct', color: 'bg-white border border-gray-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-white' },
        { id: 3, title: 'Taller de Diseño', subtitle: 'Aula Magna', color: 'bg-uba-yellow text-uba-dark' },
    ];

    const currentPabData = CAMPUS_DATA[selectedPabellon];

    return (
        <div className="pb-24 pt-6 bg-gray-50 min-h-screen dark:bg-slate-900 transition-colors duration-300">
            {/* Header Sticky */}
            <div className="sticky top-0 bg-gray-50/95 dark:bg-slate-900/95 backdrop-blur-sm z-40 px-6 pb-2 pt-2 transition-colors">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">¡Buenos días!</h2>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            {firstName}
                            <span className="text-2xl">👋</span>
                        </h1>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-sm border border-gray-100 dark:border-slate-700 relative cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <Bell size={22} className="text-gray-600 dark:text-gray-300" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-2">
                    <input 
                        type="text" 
                        placeholder="Buscar materias, aulas, sedes..." 
                        className="w-full bg-white dark:bg-slate-800 border-none py-3.5 pl-11 pr-4 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-yellow-400 outline-none placeholder-gray-400 dark:text-white dark:placeholder-gray-500 transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                </div>
            </div>

            <div className="px-6">
                
                {/* News Horizontal Scroll */}
                <div className="mb-8 overflow-x-auto no-scrollbar -mx-6 px-6 pt-2">
                    <div className="flex gap-3">
                        {news.map(item => (
                            <div key={item.id} className={`flex-shrink-0 w-40 p-4 rounded-2xl flex flex-col justify-between h-24 shadow-sm ${item.color}`}>
                                <p className="font-bold text-sm leading-tight">{item.title}</p>
                                <p className="text-[10px] opacity-80 font-medium uppercase tracking-wide">{item.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-4">Accesos Rápidos</h3>
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {quickActions.map((action, idx) => (
                        <a 
                            key={idx} 
                            href={action.url}
                            target={action.url !== '#' ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            onClick={(e) => { if (action.url === '#') e.preventDefault(); }}
                            className="flex flex-col items-center gap-2 group cursor-pointer"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-active:scale-95 ${action.color}`}>
                                <action.icon size={24} />
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-white">{action.label}</span>
                        </a>
                    ))}
                </div>

                {/* MAPA DE CIUDAD UNIVERSITARIA */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
                            <MapPin size={20} className="text-red-500" />
                            Mapa Campus
                        </h3>
                        <div className="flex bg-gray-200 dark:bg-slate-700 rounded-full p-1">
                            <button 
                                onClick={() => setSelectedPabellon('pab3')}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedPabellon === 'pab3' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                            >
                                FADU
                            </button>
                            <button 
                                onClick={() => setSelectedPabellon('pab1')}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedPabellon === 'pab1' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                            >
                                Exactas
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                        {/* Map Iframe */}
                        <div className="h-48 w-full relative bg-gray-100 dark:bg-slate-900">
                             <iframe 
                                src={currentPabData.mapUrl} 
                                width="100%" 
                                height="100%" 
                                style={{border:0}} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="UBA Map"
                            ></iframe>
                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-gray-200 dark:border-slate-600">
                                <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1">
                                    <Info size={12} className="text-blue-500" />
                                    {currentPabData.name}
                                </span>
                            </div>
                        </div>

                        {/* Floor Directory */}
                        <div className="p-5">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                                <Layers size={14} /> Directorio de Pisos
                            </h4>
                            <div className="space-y-3">
                                {currentPabData.floors.map((floor, idx) => (
                                    <div key={idx} className="flex gap-3 items-start group">
                                        <div className={`w-12 h-8 rounded-lg ${currentPabData.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center flex-shrink-0 text-xs font-bold ${selectedPabellon === 'pab3' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                            {floor.level}
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-gray-300 mt-1 leading-snug font-medium">
                                            {floor.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-br from-uba-yellow to-yellow-500 rounded-3xl p-6 mb-8 text-uba-dark shadow-lg shadow-yellow-200 dark:shadow-none">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-bold text-lg">Tu Progreso Semestral</p>
                            <p className="text-sm opacity-80">Mantén el ritmo 🔥</p>
                        </div>
                        <div className="bg-white/30 p-2 rounded-full">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl flex-1 text-center">
                            <span className="block text-2xl font-bold">85%</span>
                            <span className="text-xs font-medium">Asistencia</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl flex-1 text-center">
                            <span className="block text-2xl font-bold">4</span>
                            <span className="text-xs font-medium">Materias</span>
                        </div>
                    </div>
                </div>

                {/* Popular Courses Header */}
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Cursos Populares</h3>
                    <button className="text-yellow-600 dark:text-yellow-400 text-sm font-semibold hover:text-yellow-700">Ver todos</button>
                </div>
            </div>

            {/* Horizontal Scroll Courses (Full Bleed) */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-6 mb-4">
                {courses.map((course) => (
                    <div 
                        key={course.id}
                        onClick={() => onCourseClick(course)}
                        className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm min-w-[200px] border border-gray-100 dark:border-slate-700 flex flex-col active:scale-95 transition-transform cursor-pointer"
                    >
                        <div className={`h-24 w-full rounded-2xl mb-3 ${course.color} relative overflow-hidden`}>
                           <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                           <div className="absolute top-2 left-2 bg-white/90 dark:bg-slate-900/90 dark:text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                                {course.category}
                           </div>
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-1 line-clamp-1">{course.title}</h4>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                            <Clock size={12} />
                            <span>{course.lessons} lecciones</span>
                        </div>
                        <div className="mt-auto pt-2 border-t border-gray-50 dark:border-slate-700 flex justify-between items-center">
                             <div className="text-xs font-bold text-slate-400">Progreso</div>
                             <div className="text-xs font-bold text-yellow-600 dark:text-yellow-400">{course.progress}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};