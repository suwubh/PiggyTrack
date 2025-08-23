import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../Income/IncomeItem';
import ExpenseForm from './ExpenseForm';
import ExportToExcelButton from '../ExportToExcelButton/ExportToExcelButton';

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;
function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
    useEffect(() => {
        getExpenses();
    }, []);
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>₹{totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                        <div style={{ marginTop: '1rem' }}>
                            <ExportToExcelButton data={expenses} fileName="PiggyTrack_Expenses" buttonText="Download Expenses" />
                        </div>
                    </div>
                    <div className="incomes">
                        {expenses.map(({ _id, title, amount, date, category, description, type }) => (
                            <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type || 'expense'}
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
export default Expenses;
