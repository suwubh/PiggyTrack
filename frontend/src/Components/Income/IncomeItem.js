// File: frontend/src/Components/Income/IncomeItem.js (Revised)

import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import {
  bitcoin, book, calender, card, circle, clothing, comment, rupee,
  food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt
} from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
  id, title, amount, date, category, description,
  deleteItem, indicatorColor, type
}) {

  const categoryIcon = () => {
    switch (category) {
      case 'salary': return money;
      case 'freelancing': return freelance;
      case 'investments': return stocks;
      case 'stocks': return users; // Assuming 'users' is an icon for stocks
      case 'bitcoin': return bitcoin;
      case 'bank': return card;
      case 'youtube': return yt;
      case 'other': return piggy;
      default: return circle;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'education': return book;
      case 'groceries': return food;
      case 'health': return medical;
      case 'subscriptions': return tv;
      case 'takeaways': return takeaway;
      case 'clothing': return clothing;
      case 'travelling': return freelance; // Assuming freelance is an icon for travelling
      case 'other': return circle;
      default: return circle;
    }
  };

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {/* Render icon directly as it's likely a component or JSX from Icons.js */}
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>{rupee} {amount}</p>
            <p>{calender} {dateFormat(date)}</p>
            <p>{comment} {description}</p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={'1rem'}
              bRad={'50%'}
              bg={'var(--primary-color)'}
              color={'#fff'}
              iColor={'#fff'}
              hColor={'var(--color-green)'}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFF;
  box-shadow: 0px 1px 15px rgba(236, 72, 153, 0.06);
  border-radius: 20px;
  padding: 1.2rem 1rem;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.1rem;
  width: 100%;
  color: #222260;
  transition: box-shadow 0.18s, background 0.18s;
  &:hover {
    box-shadow: 0 4px 32px rgba(255,166,201,0.12);
    background: #FEE7F1;
  }
  .icon {
    width: 72px;
    height: 72px;
    border-radius: 18px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFF;
    box-shadow: 0 2px 14px rgba(255,166,201,0.07);
    & > * {
      font-size: 2.15rem;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    h5 {
      font-size: 1.23rem;
      font-weight: 600;
      padding-left: 2rem;
      position: relative;
      margin-bottom: 0.1rem;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 52%;
        transform: translateY(-50%);
        width: .85rem;
        height: .85rem;
        border-radius: 50%;
        background: ${props => props.indicator};
      }
    }
    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.3rem;
      .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.85;
          font-size: 1.01rem;
          font-weight: 500;
          word-break: break-all;
          margin: 0;
        }
      }
      .btn-con {
        min-width: 42px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding
