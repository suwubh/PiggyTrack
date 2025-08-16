// File: src/Components/Navigation/Navigation.js

import React from 'react';
import styled from 'styled-components';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

// Add closeDrawer prop
function Navigation({ active, setActive, handleSignOut, closeDrawer }) { 
    return (
        <NavStyled>
            <div className="user-con">
                {/* ... your user image and name ... */}
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => {
                                setActive(item.id);
                                if (closeDrawer) closeDrawer(); // Close drawer on item click
                            }}
                            className={active === item.id ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="bottom-nav-btn" onClick={handleSignOut}>
                {signout} Sign Out
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 250px; /* Default width for desktop */
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .user-con {
        height: 80px;
        display: flex;
        align-items: center;
        gap: 1rem;
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
        h2 {
            color: var(--primary-color);
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 0.5rem;
            position: relative;
            i {
                color: rgba(34, 34, 96, .6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
            span {
                font-size: 1.2rem;
            }
        }
    }

    .active {
        color: var(--primary-color) !important;
        i {
            color: var(--primary-color) !important;
        }
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav-btn {
        margin-top: auto; /* Push to bottom */
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(34, 34, 96, .6);
        cursor: pointer;
        font-weight: 500;
        transition: all .4s ease-in-out;
    }

    /* Mobile styles for Navigation component when it's inside the drawer */
    @media(max-width: 768px) {
        width: 100%; /* Take full width of the drawer */
        height: 100%; /* Take full height of the drawer */
        padding: 1rem; /* Adjust padding */
        border-radius: 0; /* Remove border-radius */
        box-shadow: none; /* Remove box-shadow */
        border: none; /* Remove border */
        background: transparent; /* Background will be set by SideDrawer */

        .user-con {
            /* Keep user-con visible in the drawer if desired, or hide it with display:none */
            display: flex; /* Or 'none' if you want to hide it on mobile in the drawer */
            margin-bottom: 1rem;
        }

        .menu-items {
            width: 100%;
            padding: 0; /* No padding needed */
            li {
                padding: 0.8rem 0.5rem;
                margin: 0.3rem 0;
                font-size: 1.1rem;
                grid-template-columns: 30px auto; /* Adjust icon/text alignment */
                span {
                    font-size: 1rem;
                }
            }
        }

        .bottom-nav-btn {
            margin-top: 1rem; /* Adjust margin */
            justify-content: center; /* Center the sign out button */
        }
    }
`;

export default Navigation;
