import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, User, Book, CreditCard } from 'lucide-react';

interface LoginScreenProps {
    onLogin: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        lu: '',
        career: 'Diseño Gráfico' // Default
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.lu) {
            const newUser: UserProfile = {
                name: formData.name,
                career: formData.career,
                image: "https://picsum.photos/200/200?random=1", // Default avatar
                lu: formData.lu
            };
            onLogin(newUser);
        }
    };

    return (
        <div className="h-full flex flex-col p-8 bg-gray-50 overflow-y-auto">
            <div className="mt-10 mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Crea tu perfil</h1>
                <p className="text-gray-500">Ingresa tus datos para personalizar tu experiencia UBA.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                {/* Name Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nombre Completo</label>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3 focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
                        <User className="text-gray-400" size={20} />
                        <input 
                            type="text" 
                            required
                            placeholder="Ej. Sofia Sayago"
                            className="w-full outline-none text-slate-800 font-medium placeholder-gray-300"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                </div>

                {/* LU Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">N° Libreta / DNI</label>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3 focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
                        <CreditCard className="text-gray-400" size={20} />
                        <input 
                            type="text" 
                            required
                            placeholder="Ej. 90210/2"
                            className="w-full outline-none text-slate-800 font-medium placeholder-gray-300"
                            value={formData.lu}
                            onChange={(e) => setFormData({...formData, lu: e.target.value})}
                        />
                    </div>
                </div>

                {/* Career Select */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Carrera</label>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3 focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
                        <Book className="text-gray-400" size={20} />
                        <select 
                            className="w-full outline-none text-slate-800 font-medium bg-transparent"
                            value={formData.career}
                            onChange={(e) => setFormData({...formData, career: e.target.value})}
                        >
                            <option value="Diseño Gráfico">Diseño Gráfico</option>
                            <option value="Arquitectura">Arquitectura</option>
                            <option value="Ingeniería Informática">Ingeniería Informática</option>
                            <option value="Medicina">Medicina</option>
                            <option value="Derecho">Derecho</option>
                            <option value="Psicología">Psicología</option>
                            <option value="CBC">CBC (Ciclo Básico Común)</option>
                        </select>
                    </div>
                </div>

                <div className="pt-8">
                    <button 
                        type="submit"
                        className="w-full bg-uba-yellow text-uba-dark font-bold text-lg py-4 rounded-2xl shadow-lg shadow-yellow-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        INGRESAR
                        <ArrowRight size={20} />
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        Al ingresar aceptas los términos y condiciones de Conectar UBA.
                    </p>
                </div>
            </form>
        </div>
    );
};