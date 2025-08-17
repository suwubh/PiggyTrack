// File: src/Components/ResponsiveNavigation/ResponsiveNavigation.js

import React, { useState } from 'react';
import styled from 'styled-components';

// Hamburger Button Component
const HamburgerButton = styled.button`
  all: unset; /* Remove all default button styles */
  cursor: pointer;
  width: 30px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute; /* Position it relative to AppStyled or MainLayout */
  top: 1.5rem; /* Adjust positioning as needed */
  left: 1.5rem;
  z-index: 2000; /* Ensure it's above other content */
  
  span {
    display: block;
    height: 4px;
    background-color: var(--primary-color);
    border-radius: 2px;
    transition: all 0.3s linear;
  }

  /* Hide hamburger button on larger screens */
  @media(min-width: 769px) {
    display: none;
  }

  /* Animation for X icon when open */
  ${({ open }) => open && `
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
`;

// Side Drawer Container
const SideDrawer = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px; /* Width of the drawer when open */
  background-color: #FCF6F9; /* Match your app background */
  box-shadow: 2px 0 10px rgba(0,0,0,0.3); /* Shadow for drawer effect */
  padding: 1rem;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'}; /* Slide in/out */
  transition: transform 0.3s ease-in-out;
  z-index: 1500; /* Ensure it's above main content but below hamburger */
  display: flex; /* Adjust to properly layout Navigation component inside */
  flex-direction: column;

  /* On larger screens, the drawer is always visible and static */
  @media(min-width: 769px) {
    transform: none !important; /* Override mobile slide effect */
    position: static; /* No longer fixed */
    width: 250px; /* Restore desktop width */
    box-shadow: none;
    padding: 0; /* Remove padding if Navigation component adds its own */
    display: flex; /* Keep flex display */
  }
`;

// Overlay to close drawer when clicking outside
const Overlay = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3); /* Darken background */
  z-index: 1400; /* Below drawer, above content */

  /* Hide overlay on larger screens */
  @media(min-width: 769px) {
    display: none;
  }
`;

// ResponsiveNavigation Component
function ResponsiveNavigation({ children }) {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <>
      <HamburgerButton open={open} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
        <span />
        <span />
        <span />
      </HamburgerButton>
      
      <SideDrawer open={open} aria-hidden={!open}>
        {/* Render the children (your Navigation component) inside the drawer */}
        {React.Children.map(children, child =>
          React.cloneElement(child, { closeDrawer: closeDrawer }) // Pass closeDrawer prop to children
        )}
      </SideDrawer>
      
      <Overlay open={open} onClick={closeDrawer} role="button" tabIndex={0} aria-label="Close menu overlay" />
    </>
  );
}

export default ResponsiveNavigation;
