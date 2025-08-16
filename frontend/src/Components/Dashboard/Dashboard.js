// File: frontend/src/Components/Dashboard/Dashboard.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History'; // Corrected import path
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
        const adjustFontSize = (element, initialRemSize, minRemSize = 1) => {
            if (!element) return;

            const defaultPxSize = initialRemSize * 16; // Convert rem to px (assuming 1rem = 16px)

            // Reset font size to initial large value to measure true required width
            // This is crucial for accurate measurement and dynamic shrinking
            element.style.fontSize = `${defaultPxSize}px`;

            const parent = element.parentElement;
            if (!parent) return; // Ensure parent exists

            const elementComputedStyle = window.getComputedStyle(element); // Get computed style for the element itself
            
            // Calculate parent's usable width, accounting for its own padding
            const parentComputedStyle = window.getComputedStyle(parent);
            const parentPaddingLeft = parseFloat(parentComputedStyle.paddingLeft);
            const parentPaddingRight = parseFloat(parentComputedStyle.paddingRight);
            const parentUsableWidth = parent.offsetWidth - parentPaddingLeft - parentPaddingRight;

            // Create a temporary span to measure text width accurately
            const textSpan = document.createElement('span'); 
            textSpan.style.fontFamily = elementComputedStyle.fontFamily; // Use element's font-family
            textSpan.style.fontWeight = elementComputedStyle.fontWeight; // Use element's font-weight
            textSpan.style.fontSize = `${defaultPxSize}px`; // Use the default size for measurement
            textSpan.style.whiteSpace = 'nowrap'; 
            textSpan.style.position = 'absolute'; 
            textSpan.style.visibility = 'hidden';
            textSpan.textContent = element.textContent; // Get the full text content
            document.body.appendChild(textSpan);
            const currentTextWidth = textSpan.offsetWidth;
            document.body.removeChild(textSpan);

            // Get the gap value from the element's computed style (it's a flex container)
            const gapBetweenRupeeAndAmount = parseFloat(elementComputedStyle.gap || '0px'); 

            // Total width needed = text content width + gap
            const totalContentWidthNeeded = currentTextWidth + gapBetweenRupeeAndAmount;

            console.log(`Element: ${element.textContent.trim()}, Parent Usable Width: ${parentUsableWidth}px, Content Needed: ${totalContentWidthNeeded}px, Gap: ${gapBetweenRupeeAndAmount}px`);

            if (totalContentWidthNeeded > parentUsableWidth && parentUsableWidth > 0) {
                let newFontSizePx = (parentUsableWidth / totalContentWidthNeeded) * defaultPxSize;
                
                // Ensure new font size doesn't go below a minimum readable size
                const minPxSize = minRemSize * 16;
                if (newFontSizePx < minPxSize) {
                    newFontSizePx = minPxSize;
                }
                element.style.fontSize = `${newFontSizePx}px`;
                console.log(`Adjusted to: ${newFontSizePx}px`);
            } else {
                element.style.fontSize = `${initialRemSize}rem`; // Reset if it fits
            }
        };

        const runAllAdjustments = () => {
            // Give a slight delay to ensure DOM is fully rendered after data updates
            setTimeout(() => {
                adjustFontSize(balanceRef.current, 4, 1.8);
                adjustFontSize(totalIncomeRef.current, 3.5, 1.5);
                adjustFontSize(totalExpenseRef.current, 3.5, 1.5);
                adjustFontSize(minIncomeRef.current, 1.6, 1);
                adjustFontSize(maxIncomeRef.current, 1.6, 1);
                adjustFontSize(minExpenseRef.current, 1.6, 1);
                adjustFontSize(maxExpenseRef.current, 1.6, 1);
            }, 100); // 100ms delay
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
    const maxExpense = expenseAmounts.length ? Math.max(...expenseAmounts) : 0; // Fixed typo: Math.Max -> Math.max

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
                    padding: 1rem; /* Ensure consistent padding here */

                    p { /* General paragraph style, removed fixed font-size */
                        font-weight: 700;
                        /* Font-size will be set dynamically by JS */
                        /* Do NOT add font-size here if you want JS to control it */
                    }
                    
                    .amount-display {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem; /* Explicit gap between rupee and amount */
                        white-space: nowrap; /* Prevent wrapping */
                        /* IMPORTANT: Remove overflow: hidden; and text-overflow: ellipsis; here */
                        /* Let JS handle the primary sizing, if it still overflows, let it be visible for debugging */
                        max-width: 100%; /* Important for flex items to shrink */
                        flex-shrink: 1; /* Allow the text content to shrink */
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
                        /* Ensure no fixed font-size here if JS is controlling */
                        /* It will be set by JS based on initialRemSize (4rem) */
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
                    /* Font size will be set dynamically by JS */
                    /* Do NOT add font-size here if you want JS to control it */
                    white-space: nowrap;
                    overflow: hidden; /* Keep for individual min/max items as they are less critical */
                    text-overflow: ellipsis;
                    max-width: 100%;
                    flex-shrink: 1; /* Allow to shrink */
                }
            }
        }
    }
`;
export default Dashboard;
