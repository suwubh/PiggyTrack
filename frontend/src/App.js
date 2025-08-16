// File: frontend/src/App.js (Revised orbMemo)

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import AuthPage from "./Components/Auth/Authpage";

function App() {
  const [active, setActive] = useState(1);

  // FIX: Place Orb component inside the useMemo
  const orbMemo = useMemo(() => <Orb />, []); // Corrected line

  // Check if user is logged in
  const token = localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        // Assuming this is for Transactions. If you removed transactions.js from backend, this might need adjustment
        // For now, it might still render the original transactions page if it exists
        return <h2>Transactions Page</h2>; // placeholder for transaction view
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  // LOGIN / SIGNUP VIEW
  if (!token) {
    return <AuthPage />;
  }

  // DASHBOARD VIEW
  return (
    <AppStyled bg={bg}>
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} handleSignOut={handleSignOut} />
        <main>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

export default App;

// --- Styled Components ---
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    padding: 20px;
  }
`;

const SignOutButton = styled.button`
  margin-bottom: 20px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;
