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
        const adjustFontSize = (element, initialRemSize, minRemSize = 1.2) => { // Increased minRemSize for better readability
            if (!element) return;

            const defaultPxSize = initialRemSize * 16; // Convert rem to px (assuming 1rem = 16px)

            // Reset to default font size for accurate measurement. Important for repeated calls.
            element.style.fontSize = `${defaultPxSize}px`;

            // Calculate current width needed by the text content
            const textWidth = element.scrollWidth;

            // Get the parent's available width
            const parentWidth = element.parentElement.offsetWidth;

            // Apply a consistent buffer (e.g., 90% of parent width for content)
            const contentBuffer = 0.9; 
            const availableWidth = parentWidth * contentBuffer;

            if (textWidth > availableWidth && availableWidth > 0) {
                let newFontSize = (defaultPxSize * availableWidth) / textWidth;
                
                // Ensure new font size doesn't fall below a minimum readable size
                const minPxSize = minRemSize * 16;
                if (newFontSize < minPxSize) {
                    newFontSize = minPxSize;
                }
                element.style.fontSize = `${newFontSize}px`;
            }
        };

        // Function to run all adjustments
        const runAllAdjustments = () => {
            adjustFontSize(balanceRef.current, 4, 1.8); // Balance, initial 4rem, min 1.8rem
            adjustFontSize(totalIncomeRef.current, 3.5, 1.5); // Total Income, initial 3.5rem, min 1.5rem
            adjustFontSize(totalExpenseRef.current, 3.5, 1.5); // Total Expense, initial 3.5rem, min 1.5rem
            adjustFontSize(minIncomeRef.current, 1.6, 1); // Min Income, initial 1.6rem, min 1rem
            adjustFontSize(maxIncomeRef.current, 1.6, 1); // Max Income, initial 1.6rem, min 1rem
            adjustFontSize(minExpenseRef.current, 1.6, 1); // Min Expense, initial 1.6rem, min 1rem
            adjustFontSize(maxExpenseRef.current, 1.6, 1); // Max Expense, initial 1.6rem, min 1rem
        };

        // Run adjustments on mount and when data changes
        runAllAdjustments();
        
        // Add event listener for window resize to re-adjust
        window.addEventListener('resize', runAllAdjustments);
        return () => window.removeEventListener('resize', runAllAdjustments);
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
                                <p className="amount-display" ref={totalIncomeRef}>
                                    {rupee} {totalIncome}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p className="amount-display" ref={totalExpenseRef}>
                                    {rupee} {totalExpenses}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
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
                            <p ref={minIncomeRef}>
                                {rupee} {minIncome}
                            </p>
                            <p ref={maxIncomeRef}>
                                {rupee} {maxIncome}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
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
                        /* REMOVE any explicit font-size here if it's causing issues */
                    }
                    /* Styling for all amount displays using flexbox */
                    .amount-display {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem; /* Small gap between rupee and amount */
                        white-space: nowrap; /* Keep on single line */
                        overflow: hidden; /* Hide anything that overflows without JS adjustment */
                        text-overflow: ellipsis; /* Show ellipsis for clipped text */
                        max-width: 100%; /* Ensure it respects container width */
                        /* IMPORTANT: Remove fixed font-size here if you have one, it's set by JS */
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
                        /* Initial font size for balance, will be adjusted by JS */
                        font-size: 4rem; /* Initial value, JS will adjust */
                        /* Ensure these are present to prevent unwanted overflow */
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 100%;
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
                    font-size: 1.6rem; /* Initial value for salary/expense min/max */
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
