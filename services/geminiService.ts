import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

// Initialize the client safely
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
} catch (error) {
    console.error("Error initializing Gemini client:", error);
}

export const generateStudyPlan = async (courseName: string): Promise<string> => {
    if (!ai) return "Error: API Key no configurada.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Crea un plan de estudios breve (3 puntos clave) para un estudiante de la UBA cursando: ${courseName}. Sé motivador y breve.`,
        });
        return response.text || "No se pudo generar el plan.";
    } catch (error) {
        console.error("Error generating plan:", error);
        return "Hubo un error al contactar a la IA.";
    }
};

export const chatWithTutor = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
    if (!ai) throw new Error("API Key missing");

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "Eres un tutor académico experto de la Universidad de Buenos Aires (UBA). Ayudas a estudiantes con dudas sobre materias, trámites del CBC y organización. Eres amable, usas emojis y respuestas concisas."
        },
        history: history
    });

    const result = await chat.sendMessageStream({ message });
    return result;
};