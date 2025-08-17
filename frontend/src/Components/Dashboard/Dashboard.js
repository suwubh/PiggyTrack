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
      font-size: clamp(1.5rem, 2.5rem, 3.5rem);
      font-weight: 700;
      
      svg, i {
        font-size: 2rem;
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
      font-size: clamp(2rem, 3rem, 4rem);
      
      svg, i {
        font-size: 2.5rem;
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
      font-size: clamp(1rem, 1.4rem, 1.6rem);
      
      svg, i {
        font-size: 1.2rem;
        flex-shrink: 0;
      }
    }
  }

  /* COMPREHENSIVE MOBILE RESPONSIVENESS */
  @media screen and (max-width: 768px) {
    .stats-con {
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }

    .chart-con {
      grid-column: 1 / -1 !important;
      height: auto !important;
      min-height: 300px;
      
      .amount-con {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
        margin-top: 1rem !important;
      }
    }

    .history-con {
      grid-column: 1 / -1 !important;
      margin-top: 1rem;
    }

    .income, .expense, .balance {
      grid-column: 1 / -1 !important;
      width: 100% !important;
      margin-bottom: 0 !important;
      
      .amount-display {
        font-size: clamp(1.2rem, 4vw, 2rem) !important;
        
        svg, i {
          font-size: clamp(1rem, 3vw, 1.5rem) !important;
        }
      }
    }

    .balance {
      grid-column: 1 / -1 !important;
      
      .amount-display {
        font-size: clamp(1.5rem, 5vw, 2.5rem) !important;
        
        svg, i {
          font-size: clamp(1.2rem, 4vw, 2rem) !important;
        }
      }
    }

    .salary-item {
      margin-bottom: 1rem;
      
      p {
        font-size: clamp(0.9rem, 3vw, 1.2rem) !important;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .stats-con {
      gap: 1rem !important;
    }
    
    .income, .expense, .balance {
      padding: 0.8rem !important;
    }
    
    .salary-item {
      padding: 0.8rem !important;
    }
  }
`;

export default Dashboard;
