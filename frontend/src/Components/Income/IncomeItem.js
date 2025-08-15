// File: frontend/src/components/Income/IncomeItem.js

import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({ id, title, amount, date, category, description, deleteItem, indicatorColor, type }) {
    
    const categoryIcon = () => {
        // Your existing switch statement for category icons
        switch(category) {
            case 'salary': return money;
            case 'freelancing': return freelance;
            // ... all other cases
            default: return '';
        }
    };

    const expenseCatIcon = () => {
        // Your existing switch statement for expense icons
        switch (category) {
            case 'education': return book;
            case 'groceries': return food;
            // ... all other cases
            default: return '';
        }
    };

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>{comment}{description}</p>
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
  // Your existing styles here
`;

export default IncomeItem;
