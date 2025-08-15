import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
  const { addIncome, getIncomes, error, setError } = useGlobalContext();
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
    setError('');
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
    setInputState({ title: '', amount: '', date: null, category: '', description: '' });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div className="input-control">
        <input 
          type="text"
          value={title}
          placeholder="Salary Title"
          onChange={handleInput('title')}
        />
      </div>
      <div className="input-control">
        <input 
          type="number"
          value={amount}
          placeholder="Salary Amount"
          onChange={handleInput('amount')}
        />
      </div>
      <div className="input-control">
        <DatePicker
          selected={date}
          placeholderText="Enter A Date"
          dateFormat="dd/MM/yyyy"
          onChange={d => setInputState({ ...inputState, date: d })}
        />
      </div>
      <div className="selects input-control">
        <select value={category} onChange={handleInput('category')}>
          <option value="" disabled>Select Option</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          value={description}
          placeholder="Add A Reference"
          onChange={handleInput('description')}
        />
      </div>
      <div className="submit-btn">
        <Button 
          name="Add Income"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent)"
          color="#fff"
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .input-control input, textarea, select {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    outline: none;
    font-size: 1rem;
  }
  .submit-btn button {
    cursor: pointer;
  }
`;

export default Form;
