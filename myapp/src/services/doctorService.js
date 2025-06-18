import axios from 'axios';

const API_URL = 'http://localhost:5000/doctors';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const getAllDoctors = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error.response?.data || { message: 'Failed to fetch doctors' };
    }
};

export const getDoctorById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor:', error);
        throw error.response?.data || { message: 'Failed to fetch doctor' };
    }
};

export const addDoctor = async (doctorData) => {
    try {
        console.log('Adding doctor:', doctorData);
        const response = await api.post('/', doctorData);
        console.log('Doctor added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding doctor:', error);
        throw error.response?.data || { message: 'Failed to add doctor' };
    }
};

export const updateDoctor = async (id, doctorData) => {
    try {
        const response = await api.put(`/${id}`, doctorData);
        return response.data;
    } catch (error) {
        console.error('Error updating doctor:', error);
        throw error.response?.data || { message: 'Failed to update doctor' };
    }
};

export const deleteDoctor = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting doctor:', error);
        throw error.response?.data || { message: 'Failed to delete doctor' };
    }
}; 