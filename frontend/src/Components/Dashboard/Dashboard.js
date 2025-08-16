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

    // Helper function to get the string length of a number
    const getNumberLength = (num) => String(num).length;

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
                                {/* Pass data-length attribute */}
                                <p className="amount-display" data-length={getNumberLength(totalIncome)}>
                                    {rupee} {totalIncome}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                {/* Pass data-length attribute */}
                                <p className="amount-display" data-length={getNumberLength(totalExpenses)}>
                                    {rupee} {totalExpenses}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                {/* Pass data-length attribute */}
                                <p className="amount-display" data-length={getNumberLength(totalBalance)}>
                                    {rupee} {totalBalance}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p data-length={getNumberLength(minIncome)}>
                                {rupee} {minIncome}
                            </p>
                            <p data-length={getNumberLength(maxIncome)}>
                                {rupee} {maxIncome}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            <p data-length={getNumberLength(minExpense)}>
                                {rupee} {minExpense}
                            </p>
                            <p data-length={getNumberLength(maxExpense)}>
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
            height: 400px; /* Ensure chart container has enough height */

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;

                .income, .expense, .balance {
                    grid-column: span 2; /* Ensures they take up 2 columns in the 4-column grid */
                }

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem; /* Adjust padding if needed */

                    .amount-display {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem; /* Explicit gap between rupee and amount */
                        white-space: nowrap; /* Prevent wrapping */
                        overflow: hidden;    /* Hide any text content that exceeds its container */
                        text-overflow: ellipsis; /* Display an ellipsis (...) when text is clipped */
                        max-width: 100%;     /* Ensures content respects parent's width */
                        flex-shrink: 1; /* Allow content to shrink if needed */
                        min-width: 0; /* Allows content to shrink below its intrinsic size */

                        /* Dynamic font sizing for income and expense based on data-length */
                        /* Clamp(min-font, preferred-font-formula, max-font) */
                        font-size: clamp(2rem, 3.5rem - (attr(data-length) - 7) * 0.15rem, 3.5rem);
                        font-weight: 700;

                        /* Targeting rupee icon specifically within amount-display */
                        svg, i { /* Assuming rupee is an SVG or an <i> tag for font icons */
                            /* Fixed size, but also consider scaling it with the amount text */
                            font-size: 2.5rem; /* Base size */
                            /* You could also scale this: font-size: calc(1em * 0.7); */
                            flex-shrink: 0; /* Prevent icon from shrinking */
                        }
                    }
                }

                .balance {
                    grid-column: 2 / 4; /* Centers balance in the 4-column grid */
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .amount-display {
                        color: var(--color-green);
                        opacity: 0.8;
                        /* Dynamic font sizing for balance, potentially larger range */
                        font-size: clamp(2.5rem, 4rem - (attr(data-length) - 7) * 0.2rem, 4rem);
                        
                        svg, i {
                            font-size: 3rem; /* Fixed size for balance rupee */
                            flex-shrink: 0;
                        }
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1; /* Takes up the last 2 columns */

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
                    min-width: 0; /* Allows paragraph content to shrink */

                    /* Dynamic font sizing for min/max amounts */
                    font-size: clamp(1.2rem, 1.6rem - (attr(data-length) - 7) * 0.08rem, 1.6rem);

                    svg, i {
                        font-size: 1.4rem; /* Fixed size for min/max rupee */
                        flex-shrink: 0;
                    }
                }
            }
        }
    }
`;

export default Dashboard;
