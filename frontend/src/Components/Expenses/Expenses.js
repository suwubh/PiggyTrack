// File: frontend/src/Components/Expenses/Expenses.js (Revised destructuring)

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
// Removed Form import if not used here
import IncomeItem from '../Income/IncomeItem'; // Renamed to TransactionItem for clarity or kept as is
import ExpenseForm from './ExpenseForm';

function Expenses() {
    // FIX: Removed addIncome from destructuring
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes"> {/* Consider renaming 'incomes' to 'transactions' or 'expense-list' */}
                        {expenses.map(({ _id, title, amount, date, category, description, type }) => (
                            <IncomeItem // Consider renaming IncomeItem to TransactionItem or similar
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type || 'expense'} // Ensure type is passed
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        ))}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}
// ... rest of the styled component
export default Expenses;
