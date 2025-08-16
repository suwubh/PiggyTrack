// File: frontend/src/Components/Navigation/Navigation.js

import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout, dollar } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../context/globalContext';

function Navigation({ active, setActive, handleSignOut }) {
    const { incomes, expenses } = useGlobalContext();

    const totalBalance = () => {
        const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        return totalIncomes - totalExpenses;
    };

    // Placeholder for user data. In a production app, this would come from your auth context or an API call.
    const user = { name: "User" };

    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="Avatar" />
                <div className="text">
                    <h2>{user?.name || "User"}</h2>
                    <p>{dollar} {totalBalance()}</p>
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
                <li onClick={handleSignOut}>
                    {signout} <span>Sign Out</span>
                </li>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px; /* Maintain fixed width for now, consider making it responsive */
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Distribute space between sections */
    gap: 1rem; /* Reduced gap to allow more vertical space for content */
    overflow-y: auto; /* Added for scrollability if content exceeds height */

    .user-con {
        height: auto; /* Let content dictate height */
        display: flex;
        flex-direction: column; /* Stack image and text vertically */
        align-items: center;
        gap: 0.5rem; /* Reduced gap */
        margin-bottom: 1rem; /* Add some space below user section */

        img {
            width: 80px; /* FIX: Set a fixed, reasonable size for the avatar */
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }

        .text {
            text-align: center; /* Center user text */
            h2 { color: rgba(34,34,96,1); font-size: 1.2rem; margin-top: 0.5rem;} /* Smaller font for name */
            p { color: rgba(34,34,96,0.6); font-size: 0.9rem;} /* Smaller font for balance */
        }
    }

    .menu-items {
        flex: 1; /* Allow menu items to take available vertical space */
        display: flex;
        flex-direction: column;
        padding-top: 1rem; /* Add padding at the top of the menu list */
        /* overflow-y: auto; if menu items themselves need scroll */

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34,34,96,0.6);
            padding-left: 1rem;
            position: relative;
            i { color: rgba(34,34,96,0.6); font-size:1.4rem; transition: all .4s ease-in-out; }
            span { /* Added span for text to ensure clickability */
                margin-left: 0.5rem;
            }
        }

        .active {
            color: rgba(34,34,96,1) !important;
            i { color: rgba(34,34,96,1) !important; }
            &::before {
                content: "";
                position: absolute;
                left:0;
                top:0;
                width:4px;
                height:100%;
                background:#222260;
                border-radius:0 10px 10px 0;
            }
        }
    }

    .bottom-nav {
        margin-top: auto; /* Pushes sign out to the bottom */
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34,34,96,0.6);
            padding-left: 1rem;
            position: relative;
            i { color: rgba(34,34,96,0.6); font-size:1.4rem; transition: all .4s ease-in-out; }
            span { /* Added span for text to ensure clickability */
                margin-left: 0.5rem;
            }
        }
    }
`;

export default Navigation;
