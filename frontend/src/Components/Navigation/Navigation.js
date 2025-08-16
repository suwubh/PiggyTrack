import React from 'react';
import styled from 'styled-components';
import defaultAvatar from '../../img/avatar.png'; // Make sure this path is correct
import { signout, dollar } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../context/globalContext';

// Import your new avatar image here if you have one.
// Example: import customAvatar from '../../img/your_custom_avatar.png';

function Navigation({ active, setActive, handleSignOut }) {
    const { incomes, expenses, user } = useGlobalContext(); // Destructure 'user' from context

    const totalBalance = () => {
        const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        return totalIncomes - totalExpenses;
    };

    return (
        <NavStyled>
            <div className="user-con">
                {/* FIX: Use your defaultAvatar or a new custom one */}
                {/* To change the image, replace `defaultAvatar` with your imported image variable (e.g., `customAvatar`) */}
                <img src={defaultAvatar} alt={user?.name || "User Avatar"} />
                <div className="text">
                    {/* FIX: Display user's name from context */}
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
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    overflow-y: auto;

    .user-con {
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }

        .text {
            text-align: center;
            h2 { color: rgba(34,34,96,1); font-size: 1.2rem; margin-top: 0.5rem;}
            p { color: rgba(34,34,96,0.6); font-size: 0.9rem;}
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-top: 1rem;

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
            span {
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
        margin-top: auto;
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
            span {
                margin-left: 0.5rem;
            }
        }
    }
`;

export default Navigation;
