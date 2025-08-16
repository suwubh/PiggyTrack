// File: frontend/src/Components/Dashboard/Dashboard.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();

    // Create refs for each amount display element
    const balanceRef = useRef(null);
    const totalIncomeRef = useRef(null);
    const totalExpenseRef = useRef(null);
    const minIncomeRef = useRef(null);
    const maxIncomeRef = useRef(null);
    const minExpenseRef = useRef(null);
    const maxExpenseRef = useRef(null);

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    // Effect to adjust font sizes dynamically
    useEffect(() => {
        // Helper function to adjust font size to fit container width
        const adjustFontSize = (element, initialRemSize) => {
            if (!element) return;

            const defaultPxSize = initialRemSize * 16; // Convert rem to px (assuming 1rem = 16px)
            element.style.fontSize = `${defaultPxSize}px`; // Reset to default to measure true text width

            const parentWidth = element.parentElement.offsetWidth; // Get width of the containing div
            const textWidth = element.scrollWidth; // Get the actual width of the text

            if (textWidth > parentWidth && parentWidth > 0) { // Check parentWidth > 0 to avoid division by zero
                const newFontSize = (defaultPxSize * parentWidth) / textWidth * 0.95; // 0.95 to give some padding
                element.style.fontSize = `${newFontSize}px`;
            }
        };

        // Run adjustment for all refs
        adjustFontSize(balanceRef.current, 4); // Initial 4rem for balance
        adjustFontSize(totalIncomeRef.current, 3.5); // Initial 3.5rem for total income
        adjustFontSize(totalExpenseRef.current, 3.5); // Initial 3.5rem for total expense
        adjustFontSize(minIncomeRef.current, 1.6); // Initial 1.6rem for min income
        adjustFontSize(maxIncomeRef.current, 1.6); // Initial 1.6rem for max income
        adjustFontSize(minExpenseRef.current, 1.6); // Initial 1.6rem for min expense
        adjustFontSize(maxExpenseRef.current, 1.6); // Initial 1.6rem for max expense

        // Add event listener for window resize to re-adjust
        const handleResize = () => {
            adjustFontSize(balanceRef.current, 4);
            adjustFontSize(totalIncomeRef.current, 3.5);
            adjustFontSize(totalExpenseRef.current, 3.5);
            adjustFontSize(minIncomeRef.current, 1.6);
            adjustFontSize(maxIncomeRef.current, 1.6);
            adjustFontSize(minExpenseRef.current, 1.6);
            adjustFontSize(maxExpenseRef.current, 1.6);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [incomes, expenses]); // Re-run this effect when data changes

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
                                {/* Attach ref */}
                                <p className="amount-display" ref={totalIncomeRef}>
                                    {rupee} {totalIncome}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                {/* Attach ref */}
                                <p className="amount-display" ref={totalExpenseRef}>
                                    {rupee} {totalExpenses}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                {/* Attach ref */}
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
                            {/* Attach refs */}
                            <p ref={minIncomeRef}>
                                {rupee} {minIncome}
                            </p>
                            <p ref={maxIncomeRef}>
                                {rupee} {maxIncome}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            {/* Attach refs */}
                            <p ref={minExpenseRef}>
                                {rupee} {minExpense}
                            </p>
                            <p ref={maxExpenseRef}>
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
                    /* Base p styles for default font size and weight */
                    p {
                        font-size: 3.5rem; /* This will be overridden by JS for balance, but is base for others */
                        font-weight: 700;
                    }
                    /* Styling for all amount displays using flexbox */
                    .amount-display {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        white-space: nowrap; /* Keep on single line */
                        overflow: hidden; /* Hide anything that overflows without JS adjustment */
                        text-overflow: ellipsis; /* Show ellipsis for clipped text */
                        max-width: 100%; /* Ensure it respects container width */
                    }
                }
                /* Specific styling for the balance container */
                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    /* Specific styling for the amount display within balance */
                    .amount-display {
                        color: var(--color-green);
                        opacity: 0.8;
                        /* Font size will be dynamically set by JS, but this is a fallback/initial */
                        font-size: 4rem; /* This will be adjusted by JS if needed */
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
                    font-size: 1.6rem; /* This font size will be adjusted by JS if needed */
                    white-space: nowrap; /* Keep on single line */
                    overflow: hidden; /* Hide anything that overflows without JS adjustment */
                    text-overflow: ellipsis; /* Show ellipsis for clipped text */
                    max-width: 100%; /* Ensure it respects container width */
                }
            }
        }
    }
`;
export default Dashboard;
