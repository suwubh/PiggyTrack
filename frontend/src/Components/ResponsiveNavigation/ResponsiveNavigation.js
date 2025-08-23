import React, { useState } from 'react';
import styled from 'styled-components';

const HamburgerButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 30px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2000;
  
  span {
    display: block;
    height: 4px;
    background-color: var(--primary-color);
    border-radius: 2px;
    transition: all 0.3s linear;
  }

  @media(min-width: 769px) {
    display: none;
  }

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

const SideDrawer = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #FCF6F9;
  box-shadow: 2px 0 10px rgba(0,0,0,0.3);
  padding: 1rem;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1500;
  display: flex;
  flex-direction: column;

  @media(min-width: 769px) {
    transform: none !important;
    position: static;
    width: 250px;
    box-shadow: none;
    padding: 0;
    display: flex;
  }
`;

const Overlay = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 1400;

  @media(min-width: 769px) {
    display: none;
  }
`;

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
        {React.Children.map(children, child =>
          React.cloneElement(child, { closeDrawer: closeDrawer })
        )}
      </SideDrawer>
      
      <Overlay open={open} onClick={closeDrawer} role="button" tabIndex={0} aria-label="Close menu overlay" />
    </>
  );
}

export default ResponsiveNavigation;
