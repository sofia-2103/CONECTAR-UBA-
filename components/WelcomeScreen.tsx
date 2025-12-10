import React from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
    onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="h-full flex flex-col items-center justify-between p-8 bg-uba-yellow relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <div className="mt-20 flex flex-col items-center z-10">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-6 rotate-3 hover:rotate-6 transition-transform duration-300">
                    <GraduationCap size={48} className="text-uba-dark" />
                </div>
                <h1 className="text-4xl font-bold text-uba-dark tracking-tight mb-2">¡HOLA!</h1>
                <p className="text-uba-dark/80 text-center text-sm font-medium">
                    Bienvenido a Conectar UBA
                </p>
            </div>

            <div className="flex flex-col items-center w-full z-10 mb-10">
                <p className="text-center text-uba-dark/70 mb-8 text-sm leading-relaxed max-w-xs">
                    Gestiona tus materias, revisa fechas de exámenes y obtén ayuda con IA para potenciar tu carrera universitaria.
                </p>
                
                <button 
                    onClick={onStart}
                    className="group bg-white text-uba-dark font-bold text-lg py-4 px-12 rounded-full shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                    COMENZAR
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};