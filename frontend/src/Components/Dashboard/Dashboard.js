// File: frontend/src/Components/Dashboard/Dashboard.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [getIncomes, getExpenses]); // Add dependencies to useEffect

    // Safely calculate min/max, returning 0 if arrays are empty
    const minIncome = incomes.length ? Math.min(...incomes.map(item => item.amount)) : 0;
    const maxIncome = incomes.length ? Math.max(...incomes.map(item => item.amount)) : 0;
    const minExpense = expenses.length ? Math.min(...expenses.map(item => item.amount)) : 0;
    const maxExpense = expenses.length ? Math.max(...expenses.map(item => item.amount)) : 0;

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
                                <p>{rupee} {totalIncome()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>{rupee} {totalExpenses()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>{rupee} {totalBalance()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p>{rupee} {minIncome}</p>
                            <p>{rupee} {maxIncome}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            <p>{rupee} {minExpense}</p>
                            <p>{rupee} {maxExpense}</p>
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
                .income, .expense {
                    grid-column: span 2;
                }
                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
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

    /* === START OF MOBILE RESPONSIVENESS FIX === */
    @media screen and (max-width: 768px) {
        .stats-con {
            grid-template-columns: 1fr;
        }
        .chart-con, .history-con {
            grid-column: 1 / -1;
        }
        .amount-con {
            grid-template-columns: 1fr;
            margin-top: 1rem;
            gap: 1rem;
        }
        .income, .expense, .balance {
            grid-column: 1 / -1 !important;
        }
        .history-con {
            margin-top: 2rem;
        }
        .balance p, .income p, .expense p {
            font-size: 2rem !important; /* Reduce font size on mobile to prevent overflow */
        }
    }
    /* === END OF MOBILE RESPONSIVENESS FIX === */
`;

export default Dashboard;
