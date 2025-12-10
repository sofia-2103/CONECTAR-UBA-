export interface Course {
    id: string;
    title: string;
    category: string;
    progress: number;
    lessons: number;
    color: string;
    image: string;
}

export interface ImportantDate {
    id: string;
    title: string;
    date: string;
    type: 'exam' | 'holiday' | 'administrative';
    description: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export interface UserProfile {
    name: string;
    career: string;
    image: string;
    lu?: string; // Added Libreta Universitaria
}

export enum ViewState {
    WELCOME = 'WELCOME',
    LOGIN = 'LOGIN',
    HOME = 'HOME',
    DATES = 'DATES',
    COURSES = 'COURSES',
    PROFILE = 'PROFILE'
}