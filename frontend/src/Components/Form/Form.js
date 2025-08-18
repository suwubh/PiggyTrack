// File: frontend/src/components/Form/Form.js
import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const amt = Number(amount);
        if (!title || !category || !description || !date) {
            setError('All fields are required!');
            return;
        }
        if (isNaN(amt) || amt <= 0) {
            setError('Amount must be a positive number!');
            return;
        }
        await addIncome({ title, amount: amt, category, description, date });
        setInputState({
            title: '',
            amount: '',
            date: null,
            category: '',
            description: '',
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <InputGroup>
                <Label htmlFor="title">Income Title</Label>
                <Input
                    id="title"
                    type="text"
                    value={title}
                    name="title"
                    placeholder="e.g. Salary for June"
                    onChange={handleInput('title')}
                    required
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="amount">Income Amount</Label>
                <Input
                    id="amount"
                    value={amount}
                    type="number"
                    name="amount"
                    placeholder="e.g. 50000"
                    onChange={handleInput('amount')}
                    required
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="date">Select Date</Label>
                <StyledDatePicker
                    id="date"
                    placeholderText="Select a date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date })
                    }}
                    required
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="category">Income Category</Label>
                <Select 
                    required 
                    value={category} 
                    name="category" 
                    id="category" 
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Select a Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </Select>
            </InputGroup>

            <InputGroup>
                <Label htmlFor="description">Add Reference</Label>
                <TextArea 
                    name="description" 
                    value={description} 
                    placeholder="Any additional notes or reference" 
                    id="description" 
                    rows="3" 
                    onChange={handleInput('description')}
                    required
                />
            </InputGroup>

            <SubmitButton type="submit">
                <span className="button-icon">{plus}</span>
                Add Income
            </SubmitButton>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 18px;
    padding: 2rem 1.5rem;
    box-shadow: 0 4px 28px rgba(236, 72, 153, 0.08);
    border: 1px solid rgba(255, 182, 193, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 1.5rem 1rem;
        gap: 1.2rem;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
`;

const Label = styled.label`
    font-weight: 500;
    color: #be185d;
    font-size: 0.95rem;
    letter-spacing: 0.3px;
    margin-bottom: 0.2rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #fce7f3;
    border-radius: 12px;
    font-size: 1rem;
    background: #fef7ff;
    color: #222260;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #f9a8d4;
        box-shadow: 0 0 0 3px rgba(249, 168, 212, 0.1);
        background: #ffffff;
    }

    &::placeholder {
        color: #9ca3af;
    }

    &:hover {
        border-color: #f3e8ff;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #fce7f3;
    border-radius: 12px;
    font-size: 1rem;
    background: #fef7ff;
    color: #222260;
    transition: all 0.2s ease;
    cursor: pointer;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #f9a8d4;
        box-shadow: 0 0 0 3px rgba(249, 168, 212, 0.1);
        background: #ffffff;
    }

    &:hover {
        border-color: #f3e8ff;
    }

    option {
        background: #ffffff;
        color: #222260;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #fce7f3;
    border-radius: 12px;
    font-size: 1rem;
    background: #fef7ff;
    color: #222260;
    transition: all 0.2s ease;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #f9a8d4;
        box-shadow: 0 0 0 3px rgba(249, 168, 212, 0.1);
        background: #ffffff;
    }

    &::placeholder {
        color: #9ca3af;
    }

    &:hover {
        border-color: #f3e8ff;
    }
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100% !important;
    padding: 0.75rem 1rem;
    border: 1.5px solid #fce7f3;
    border-radius: 12px;
    font-size: 1rem;
    background: #fef7ff;
    color: #222260;
    transition: all 0.2s ease;
    cursor: pointer;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #f9a8d4;
        box-shadow: 0 0 0 3px rgba(249, 168, 212, 0.1);
        background: #ffffff;
    }

    &:hover {
        border-color: #f3e8ff;
    }
`;

const ErrorMessage = styled.div`
    color: #ef4444;
    background: #fef2f2;
    border: 1px solid #fecaca;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 0.5rem;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.8rem 1.5rem;
    margin-top: 0.5rem;
    background: linear-gradient(135deg, #f9a8d4, #ec4899);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 2px 10px rgba(236, 72, 153, 0.15);

    &:hover {
        background: linear-gradient(135deg, #f472b6, #db2777);
        transform: translateY(-1px);
        box-shadow: 0 4px 20px rgba(236, 72, 153, 0.25);
    }

    &:active {
        transform: translateY(0);
    }

    .button-icon {
        font-size: 1.1rem;
        display: flex;
        align-items: center;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0.7rem 1.2rem;
    }
`;

export default Form;
