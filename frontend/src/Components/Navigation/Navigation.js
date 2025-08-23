import React from 'react';
import styled from 'styled-components';
import defaultAvatar from '../../img/avatar.png';
import { signout, rupee } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../context/globalContext';

function Navigation({ active, setActive, handleSignOut, closeDrawer }) {
    const { incomes, expenses, user } = useGlobalContext();

    const totalBalance = () => {
        const totalIncomes = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        return totalIncomes - totalExpenses;
    };

    return (
        <NavStyled>
            <div className="user-con">
                <img src={defaultAvatar} alt={user?.name || "User Avatar"} />
                <div className="text">
                    <h2>{user?.name || "User"}</h2>
                    <p>{rupee} {totalBalance()}</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map(item => (
                    <li
                        key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            if (closeDrawer) closeDrawer();
                        }}
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
    width: 374px; /* Your original width */
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

    /* === START OF MOBILE DRAWER STYLES === */
    @media(max-width: 768px) {
        width: 100%; /* Take full width of the drawer */
        height: 100%; /* Take full height of the drawer */
        padding: 1rem; /* Adjust padding for mobile */
        border-radius: 0;
        box-shadow: none;
        border: none;
        background: transparent;

        /* Ensure user-con is still visible and looks good */
        .user-con {
            display: flex; /* Kept from your original, looks good for the drawer */
            margin-bottom: 1rem;
        }

        .menu-items {
            width: 100%;
            padding: 0;
            li {
                padding: 0.8rem 0.5rem;
                margin: 0.3rem 0;
                font-size: 1.1rem;
                grid-template-columns: 30px auto;
                span {
                    font-size: 1rem;
                }
            }
        }

        .bottom-nav {
            margin-top: 1rem;
            justify-content: center;
        }
    }
    /* === END OF MOBILE DRAWER STYLES === */
`;

export default Navigation;
