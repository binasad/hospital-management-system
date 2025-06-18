import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Doctors from './Doctors';

// Mock axios
jest.mock('axios');

describe('Doctors Component', () => {
    const mockDoctors = [
        {
            _id: '1',
            name: 'Dr. John Smith',
            specialization: 'Cardiology',
            experience: '10',
            contact: '1234567890',
            email: 'john.smith@hospital.com'
        }
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        // Mock the initial doctors fetch
        axios.get.mockResolvedValue({ data: mockDoctors });
    });

    test('renders doctors component', async () => {
        render(<Doctors />);
        expect(screen.getByText('Add New Doctor')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Doctors List')).toBeInTheDocument();
        });
    });

    test('adds new doctor successfully', async () => {
        const newDoctor = {
            name: 'Dr. Jane Doe',
            specialization: 'Pediatrics',
            experience: '5',
            contact: '9876543210',
            email: 'jane.doe@hospital.com'
        };

        // Mock the POST request
        axios.post.mockResolvedValue({ data: { ...newDoctor, _id: '2' } });
        // Mock the GET request after adding
        axios.get.mockResolvedValue({ data: [...mockDoctors, { ...newDoctor, _id: '2' }] });

        render(<Doctors />);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: newDoctor.name }
        });
        fireEvent.change(screen.getByLabelText(/specialization/i), {
            target: { value: newDoctor.specialization }
        });
        fireEvent.change(screen.getByLabelText(/experience/i), {
            target: { value: newDoctor.experience }
        });
        fireEvent.change(screen.getByLabelText(/contact/i), {
            target: { value: newDoctor.contact }
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: newDoctor.email }
        });

        // Submit the form
        fireEvent.click(screen.getByText('Add Doctor'));

        // Verify the POST request was made with correct data
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5000/doctors',
                newDoctor
            );
        });

        // Verify the form was reset
        expect(screen.getByLabelText(/name/i)).toHaveValue('');
        expect(screen.getByLabelText(/specialization/i)).toHaveValue('');
        expect(screen.getByLabelText(/experience/i)).toHaveValue('');
        expect(screen.getByLabelText(/contact/i)).toHaveValue('');
        expect(screen.getByLabelText(/email/i)).toHaveValue('');
    });

    test('displays error message when adding doctor fails', async () => {
        // Mock the POST request to fail
        axios.post.mockRejectedValue(new Error('Failed to add doctor'));

        render(<Doctors />);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'Dr. Test' }
        });
        fireEvent.change(screen.getByLabelText(/specialization/i), {
            target: { value: 'Test' }
        });
        fireEvent.change(screen.getByLabelText(/experience/i), {
            target: { value: '1' }
        });
        fireEvent.change(screen.getByLabelText(/contact/i), {
            target: { value: '1234567890' }
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@test.com' }
        });

        // Submit the form
        fireEvent.click(screen.getByText('Add Doctor'));

        // Verify error message is displayed
        await waitFor(() => {
            expect(screen.getByText('Failed to add doctor. Please try again.')).toBeInTheDocument();
        });
    });

    test('validates required fields', async () => {
        render(<Doctors />);

        // Try to submit empty form
        fireEvent.click(screen.getByText('Add Doctor'));

        // Check that the form validation prevents submission
        expect(axios.post).not.toHaveBeenCalled();
    });
}); 