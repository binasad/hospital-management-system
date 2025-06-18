import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Appointments from './Appointments';

// Mock axios
jest.mock('axios');

describe('Appointments Component', () => {
    const mockAppointments = [
        {
            _id: '1',
            patientName: 'John Doe',
            doctorName: 'Dr. Smith',
            date: '2024-03-20'
        }
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        // Mock the initial appointments fetch
        axios.get.mockResolvedValue({ data: mockAppointments });
    });

    test('renders appointments component', async () => {
        render(<Appointments />);
        expect(screen.getByText('Add New Appointment')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Appointments (1)')).toBeInTheDocument();
        });
    });

    test('adds new appointment', async () => {
        const newAppointment = {
            patientName: 'Jane Doe',
            doctorName: 'Dr. Johnson',
            date: '2024-03-21'
        };

        axios.post.mockResolvedValue({ data: { ...newAppointment, _id: '2' } });

        render(<Appointments />);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/patient name/i), {
            target: { value: newAppointment.patientName }
        });
        fireEvent.change(screen.getByLabelText(/doctor name/i), {
            target: { value: newAppointment.doctorName }
        });
        fireEvent.change(screen.getByLabelText(/date/i), {
            target: { value: newAppointment.date }
        });

        // Submit the form
        fireEvent.click(screen.getByText('Add Appointment'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5000/appointments/add',
                newAppointment
            );
        });
    });

    test('displays error message when form validation fails', async () => {
        render(<Appointments />);
        
        // Try to submit empty form
        fireEvent.click(screen.getByText('Add Appointment'));

        expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });

    test('deletes an appointment', async () => {
        axios.delete.mockResolvedValue({ data: {} });

        render(<Appointments />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        // Click delete button (you'll need to add a data-testid to your delete button in AppointmentCard)
        const deleteButton = screen.getByTestId('delete-button-1');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith(
                'http://localhost:5000/appointments/delete/1'
            );
        });
    });
}); 