// File: frontend/src/Components/Navigation/Navigation.js (Revised)

import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout, dollar } from '../../utils/Icons'; // Ensure dollar is imported
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../context/globalContext'; // Import useGlobalContext

function Navigation({ active, setActive, handleSignOut }) { // handleSignOut received as prop
    const { incomes, expenses, error } = useGlobalContext(); // Get incomes and expenses

    // Calculate totalBalance based on incomes and expenses from context
    const totalBalance = () => {
        const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        return totalIncomes - totalExpenses;
    };

    // You might need to fetch user data if not passed from App.js or stored in context directly
    // For now, assuming user is available from context or passed as prop.
    // If user object comes from context, it needs to be explicitly exposed by GlobalProvider.
    // For simplicity, let's assume it's available in context for now, or passed as a prop from App.js
    const user = { name: "User" }; // Placeholder or get from context

    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="Avatar" />
                <div className="text">
                    <h2>{user?.name || "User"}</h2>
                    <p>{dollar} {totalBalance()}</p> {/* Use dollar icon and calculated balance */}
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map(item => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="bottom-nav">
                <li onClick={handleSignOut}> {/* Call handleSignOut on click */}
                    {signout} <span>Sign Out</span>
                </li>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    // Your existing styles here
`;

export default Navigation;
