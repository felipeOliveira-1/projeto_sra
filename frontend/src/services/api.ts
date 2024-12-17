import axios from 'axios';
import { Goal } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const generateContent = async (goal: Goal) => {
    try {
        const response = await api.post('/generate_content', goal);
        return response.data;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
};

export const scheduleReview = async (goal: Goal) => {
    try {
        const response = await api.post('/schedule_review', goal);
        return response.data;
    } catch (error) {
        console.error('Error scheduling review:', error);
        throw error;
    }
};
