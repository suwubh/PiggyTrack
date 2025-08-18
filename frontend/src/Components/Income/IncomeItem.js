import React from 'react';
import styled from 'styled-components';

const AddIncomeForm = ({
  handleSubmit,
  title,
  setTitle,
  amount,
  setAmount,
  date,
  setDate,
  category,
  setCategory,
  reference,
  setReference,
  categories
}) => {
  return (
    <FormWrapper onSubmit={handleSubmit} autoComplete="off">
      <FormGroup>
        <Label htmlFor="title">Income Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Salary for June"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="amount">Income Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="e.g. 50000"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="date">Enter a Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select a Category</option>
          {categories.map(option => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="reference">Add a Reference</Label>
        <TextArea
          id="reference"
          rows={3}
          value={reference}
          onChange={e => setReference(e.target.value)}
          placeholder="Any notes for this income"
        />
      </FormGroup>

      <AddButton type="submit">Add Income</AddButton>
    </FormWrapper>
  );
};

export default AddIncomeForm;

// Styled Components
const FormWrapper = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: #ffffffcc;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  box-shadow: 0 4px 28px rgba(236, 72, 153, 0.09);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Label = styled.label`
  margin-bottom: 0.15rem;
  font-weight: 500;
  color: #be185d;
  letter-spacing: 0.5px;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid #fce7f3;
  border-radius: 10px;
  font-size: 1rem;
  background: #fef7ff;
  color: #222260;
  transition: border-color 0.18s;
  &:focus {
    border-color: #f9a8d4;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid #fce7f3;
  border-radius: 10px;
  font-size: 1rem;
  background: #fef7ff;
  color: #222260;
  transition: border-color 0.18s;
  &:focus {
    border-color: #f9a8d4;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid #fce7f3;
  border-radius: 10px;
  font-size: 1rem;
  background: #fef7ff;
  color: #222260;
  resize: vertical;
  min-height: 70px;
  transition: border-color 0.18s;
  &:focus {
    border-color: #f9a8d4;
    outline: none;
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.3rem;
  font-size: 1.08rem;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #f9a8d4, #ed64a6 85%);
  color: #fff;
  box-shadow: 0 2px 9px rgba(236, 72, 153, 0.13);
  cursor: pointer;
  transition: background 0.19s, transform 0.13s;
  &:hover, &:focus {
    background: linear-gradient(135deg, #f072b6, #db2777 85%);
    transform: translateY(-1px) scale(1.012);
  }
`;
