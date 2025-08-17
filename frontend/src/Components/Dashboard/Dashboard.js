// File: src/Components/Dashboard/Dashboard.js

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

// Keep your original CSS styling exactly as it was
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
      }
    }
  }

  .income, .expense, .balance {
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    .amount-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      flex-shrink: 1;
      min-width: 0;
      font-size: clamp(2rem, 3.5rem - (attr(data-length) - 7) * 0.15rem, 3.5rem);
      font-weight: 700;
      svg, i {
        font-size: 2.5rem;
        flex-shrink: 0;
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
      font-size: clamp(2.5rem, 4rem - (attr(data-length) - 7) * 0.2rem, 4rem);
      svg, i {
        font-size: 3rem;
        flex-shrink: 0;
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
      min-width: 0;
      font-size: clamp(1.2rem, 1.6rem - (attr(data-length) - 7) * 0.08rem, 1.6rem);
      svg, i {
        font-size: 1.4rem;
        flex-shrink: 0;
      }
    }
  }

  /* === START OF MOBILE RESPONSIVENESS FIX === */
  @media screen and (max-width: 768px) {
    .stats-con {
      grid-template-columns: 1fr; /* Stack main sections vertically */
    }

    .chart-con, .history-con {
      grid-column: 1 / -1; /* Make each main section full width */
    }

    .amount-con {
      grid-template-columns: 1fr; /* Stack amount boxes vertically */
    }

    .income, .expense, .balance {
      grid-column: 1 / -1 !important; /* Make each amount box full width */
    }
  }

  /* === END OF MOBILE RESPONSIVENESS FIX === */
`;

export default Dashboard;
