// File: frontend/src/Components/Dashboard/Dashboard.js

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    const incomeAmounts = incomes.map(item => item.amount);
    const minIncome = incomeAmounts.length ? Math.min(...incomeAmounts) : 0;
    const maxIncome = incomeAmounts.length ? Math.max(...incomeAmounts) : 0;

    const expenseAmounts = expenses.map(item => item.amount);
    const minExpense = expenseAmounts.length ? Math.min(...expenseAmounts) : 0;
    const maxExpense = expenseAmounts.length ? Math.max(...expenseAmounts) : 0;

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p className="amount-display">
                                    {rupee} {totalIncome}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p className="amount-display">
                                    {rupee} {totalExpenses}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                {/* Removed ref */}
                                <p className="amount-display">
                                    {rupee} {totalBalance}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p>
                                {rupee} {minIncome}
                            </p>
                            <p>
                                {rupee} {maxIncome}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            <p>
                                {rupee} {minExpense}
                            </p>
                            <p>
                                {rupee} {maxExpense}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con {
            grid-column: 1 / 4;
            height: 400px;
            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense, .balance {
                    grid-column: span 2;
                }
                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem; /* Consider reducing this if needed: e.g., padding: 0.5rem; */

                    p {
                        font-size: 3.5rem; /* Reverting to fixed font size */
                        font-weight: 700;
                    }
                    
                    .amount-display {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem; /* Explicit gap between rupee and amount */
                        white-space: nowrap; /* Prevent wrapping */
                        overflow: hidden;    /* Hide any text content that exceeds its container */
                        text-overflow: ellipsis; /* Display an ellipsis (...) when text is clipped */
                        max-width: 100%;     /* Ensures content respects parent's width */
                        flex-shrink: 1; /* Allow content to shrink */

                        /* Targeting rupee icon specifically within amount-display */
                        svg, i { /* Assuming rupee is an SVG or an <i> tag for font icons */
                            font-size: 2.5rem; /* Fixed size, adjust as needed */
                        }
                    }
                }
                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .amount-display {
                        color: var(--color-green);
                        opacity: 0.8;
                        font-size: 4rem; /* Reverting balance to a fixed, larger font size */

                        svg, i {
                            font-size: 3rem; /* Fixed size for balance rupee, adjust as needed */
                        }
                    }
                }
            }
        }
        .history-con {
            grid-column: 4 / -1;
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title {
                font-size: 1.2rem;
                span {
                    font-size: 1.8rem;
                }
            }
            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                    flex-shrink: 1;

                    font-size: 1.6rem; /* Reverting min/max salary/expense to fixed font size */

                    svg, i {
                        font-size: 1.4rem; /* Fixed size for min/max rupee, adjust as needed */
                    }
                }
            }
        }
    }
`;
export default Dashboard;
