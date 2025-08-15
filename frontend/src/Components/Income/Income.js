import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../Income/IncomeItem';

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">Total Income: <span>₹{totalIncome()}</span></h2>
        <div className="income-content">
          <div className="form-container"><Form /></div>
          <div className="incomes">
            {incomes.map(income => (
              <IncomeItem
                key={income._id}
                id={income._id}
                title={income.title}
                amount={income.amount}
                description={income.description}
                date={income.date}
                category={income.category}
                indicatorColor="var(--color-green)"
                deleteItem={deleteIncome}
              />
            ))}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  .total-income { margin: 1rem 0; font-size: 1.5rem; }
  .income-content { display: flex; gap: 2rem; }
  .incomes { flex: 1; }
`;

export default Income;
