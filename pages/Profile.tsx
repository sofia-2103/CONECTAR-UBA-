import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { Camera, Edit2, Save, X, LogOut, Mail, GraduationCap, Bell, Moon, CircleHelp, ChevronRight } from 'lucide-react';

interface ProfileProps {
    user: UserProfile;
    onUpdateUser: (user: UserProfile) => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, isDarkMode, onToggleDarkMode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<UserProfile>(user);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        onUpdateUser(editForm);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditForm(user);
        setIsEditing(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="pb-24 pt-6 px-6 bg-gray-50 dark:bg-slate-900 min-h-screen flex flex-col items-center transition-colors duration-300">
            
            <div className="w-full flex justify-between items-center mb-8">
                 <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mi Perfil</h1>
                 {!isEditing && (
                     <button 
                        onClick={() => setIsEditing(true)}
                        className="text-yellow-600 dark:text-yellow-400 font-bold text-sm flex items-center gap-1"
                     >
                         <Edit2 size={16} /> Editar
                     </button>
                 )}
            </div>

            {/* Profile Image */}
            <div className="relative mb-6 group">
                <div className="w-32 h-32 bg-gray-200 dark:bg-slate-700 rounded-full p-1 border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden relative">
                    <img 
                        src={isEditing ? editForm.image : user.image} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full" 
                    />
                    {isEditing && (
                        <div 
                            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="text-white" size={32} />
                        </div>
                    )}
                </div>
                {isEditing && (
                    <div className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full border-4 border-gray-50 dark:border-slate-800 text-white shadow-sm pointer-events-none">
                        <Edit2 size={16} />
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*"
                />
            </div>

            {/* Form / Display */}
            <div className="w-full max-w-sm space-y-4">
                
                {/* Name Field */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 text-gray-400 mb-1">
                        <Mail size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Nombre Completo</span>
                    </div>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full font-bold text-slate-800 dark:text-white text-lg border-b border-gray-200 dark:border-slate-600 focus:border-yellow-400 dark:focus:border-yellow-400 outline-none py-1 bg-transparent"
                        />
                    ) : (
                        <p className="font-bold text-slate-800 dark:text-white text-lg">{user.name}</p>
                    )}
                </div>

                {/* Career Field */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 text-gray-400 mb-1">
                        <GraduationCap size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Carrera / Ciclo</span>
                    </div>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={editForm.career}
                            onChange={(e) => setEditForm({...editForm, career: e.target.value})}
                            className="w-full font-bold text-slate-800 dark:text-white text-lg border-b border-gray-200 dark:border-slate-600 focus:border-yellow-400 dark:focus:border-yellow-400 outline-none py-1 bg-transparent"
                        />
                    ) : (
                        <p className="font-bold text-slate-800 dark:text-white text-lg">{user.career}</p>
                    )}
                </div>

            </div>

            {/* Settings Section (Only visible when not editing) */}
            {!isEditing && (
                <div className="w-full max-w-sm mt-8">
                    <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-3 px-1">Ajustes de la App</h3>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                        
                        {/* Notifications */}
                        <div className="p-4 border-b border-gray-50 dark:border-slate-700 flex justify-between items-center active:bg-gray-50 dark:active:bg-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-xl">
                                    <Bell size={20} />
                                </div>
                                <span className="font-medium text-slate-700 dark:text-gray-200">Notificaciones</span>
                            </div>
                            <button 
                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                className={`w-12 h-7 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-600'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-all ${notificationsEnabled ? 'left-[22px]' : 'left-1'}`}></div>
                            </button>
                        </div>

                        {/* Dark Mode */}
                        <div className="p-4 border-b border-gray-50 dark:border-slate-700 flex justify-between items-center active:bg-gray-50 dark:active:bg-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 rounded-xl">
                                    <Moon size={20} />
                                </div>
                                <span className="font-medium text-slate-700 dark:text-gray-200">Modo Oscuro</span>
                            </div>
                            <button 
                                onClick={onToggleDarkMode}
                                className={`w-12 h-7 rounded-full transition-colors relative ${isDarkMode ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-600'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-all ${isDarkMode ? 'left-[22px]' : 'left-1'}`}></div>
                            </button>
                        </div>

                        {/* Help */}
                        <button className="w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl">
                                    <CircleHelp size={20} />
                                </div>
                                <span className="font-medium text-slate-700 dark:text-gray-200">Ayuda y Soporte</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 dark:text-gray-500" />
                        </button>

                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 w-full max-w-sm flex gap-3">
                {isEditing ? (
                    <>
                        <button 
                            onClick={handleCancel}
                            className="flex-1 py-4 rounded-2xl font-bold text-slate-500 dark:text-gray-300 bg-gray-200 dark:bg-slate-700 flex items-center justify-center gap-2"
                        >
                            <X size={20} /> Cancelar
                        </button>
                        <button 
                            onClick={handleSave}
                            className="flex-1 py-4 rounded-2xl font-bold text-uba-dark bg-uba-yellow shadow-lg shadow-yellow-200 dark:shadow-none flex items-center justify-center gap-2"
                        >
                            <Save size={20} /> Guardar
                        </button>
                    </>
                ) : (
                    <button className="w-full py-4 rounded-2xl font-bold text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 flex items-center justify-center gap-2 mt-4">
                        <LogOut size={20} /> Cerrar Sesión
                    </button>
                )}
            </div>
        </div>
    );
};