// File: frontend/src/Components/Dashboard/Dashboard.js

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar, rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();

    // Ref for the balance display element
    const balanceRef = useRef(null);

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        // FIX: Dynamic font size adjustment for total balance
        const adjustFontSize = () => {
            if (balanceRef.current) {
                const parentWidth = balanceRef.current.parentElement.offsetWidth; // Get width of the containing div
                const textWidth = balanceRef.current.scrollWidth; // Get the actual width of the text
                const currentFontSize = parseFloat(window.getComputedStyle(balanceRef.current).fontSize); // Get current font size

                // If text is wider than its parent, reduce font size proportionally
                if (textWidth > parentWidth) {
                    const newFontSize = (currentFontSize * parentWidth) / textWidth * 0.9; // 0.9 to give some padding
                    balanceRef.current.style.fontSize = `${newFontSize}px`;
                } else {
                    // Reset to a default large size if it fits, then check again
                    // This prevents it from shrinking too much if the number becomes small again
                    // You might need to refine this based on your max expected size
                    balanceRef.current.style.fontSize = `4rem`; // Reset to max default, then let it shrink if needed
                }
            }
        };

        // Run adjustment on mount and whenever incomes/expenses change (data update)
        adjustFontSize();
        // Also run on window resize to adapt to layout changes
        window.addEventListener('resize', adjustFontSize);
        return () => window.removeEventListener('resize', adjustFontSize);
    }, [incomes, expenses]); // Rerun effect when data changes

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
                                {/* FIX: Attach ref to the p tag */}
                                <p className="amount-display" ref={balanceRef}>
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
                    padding: 1rem;
                    p {
                        font-size: 3.5rem; /* Base font size for all */
                        font-weight: 700;
                    }
                    .amount-display {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        white-space: nowrap; /* Keep on single line */
                        /* Do NOT use overflow: hidden; or text-overflow: ellipsis; here anymore for balance */
                        /* We will control font size with JS for balance */
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
                        /* Initial large font size for balance, will be adjusted by JS */
                        font-size: 4rem; /* This will be the starting point for JS adjustment */
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
                    font-size: 1.6rem;
                }
            }
        }
    }
`;
export default Dashboard;
