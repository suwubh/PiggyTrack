import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons'; // Assuming 'rupee' icon is available
import { dateFormat } from '../../utils/dateFormat';

function Transactions() {
  const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Combine incomes and expenses into a single array
  const allTransactions = [...incomes.map(i => ({
    ...i,
    type: 'income'
  })), ...expenses.map(e => ({
    ...e,
    type: 'expense'
  }))];

  // Sort by createdAt date, latest first
  allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <TransactionsStyled>
      <InnerLayout>
        <h1>Transactions history</h1>
        <div className="transactions-list">
          {allTransactions.length === 0 ? (
            <p className="no-transactions">No transactions to display yet.</p>
          ) : (
            allTransactions.map(transaction => (
              <div
                key={transaction._id}
                className={`transaction-item ${transaction.type === 'income' ? 'income-item' : 'expense-item'}`}
              >
                <div className="transaction-details">
                  <span className="title">{transaction.title}</span>
                  <span className="date">{dateFormat(transaction.date)}</span>
                </div>
                <div className="transaction-amount">
                  {transaction.type === 'income' ? '+' : '-'} {rupee} {transaction.amount}
                </div>
              </div>
            ))
          )}
        </div>
      </InnerLayout>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  display: flex;
  overflow: auto;
  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;

    .no-transactions {
      text-align: center;
      font-size: 1.2rem;
      color: rgba(34, 34, 96, 0.6);
      padding: 2rem;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
    }

    .transaction-item {
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.1rem; /* Slightly larger text */

      .transaction-details {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        .title {
          font-weight: 600;
          color: var(--primary-color);
        }
        .date {
          font-size: 0.9rem;
          color: rgba(34, 34, 96, 0.4);
        }
      }

      .transaction-amount {
        font-weight: 700;
        font-size: 1.3rem; /* Prominent amount */
      }

      &.income-item {
        border-left: 6px solid var(--color-green); /* Green border for income */
        .transaction-amount {
          color: var(--color-green);
        }
      }

      &.expense-item {
        border-left: 6px solid var(--color-delete); /* Red border for expense */
        .transaction-amount {
          color: var(--color-delete);
        }
      }
    }
  }
`;

export default Transactions;
