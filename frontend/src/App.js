// File: src/App.js
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
import Transactions from "./Components/Transactions/Transactions";
import { GlobalStyle } from "./styles/GlobalStyle";
import ResponsiveNavigation from "./Components/ResponsiveNavigation/ResponsiveNavigation";

function App() {
    const [active, setActive] = useState(1);
    const orbMemo = useMemo(() => <Orb />, []);
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
                return <Transactions />;
            case 3:
                return <Income />;
            case 4:
                return <Expenses />;
            default:
                return <Dashboard />;
        }
    };
    if (!token) {
        return <AuthPage />;
    }
    return (
        <AppStyled bg={bg}>
            <GlobalStyle />
            {orbMemo}
            <MainLayout>
                <ResponsiveNavigation>
                    <Navigation active={active} setActive={setActive} handleSignOut={handleSignOut} />
                </ResponsiveNavigation>
                <main>
                    <HeaderTitle>PiggyTrack</HeaderTitle>
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
    );
}
export default App;

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
        
        margin-left: 0; /* Default: no margin on mobile */

        /* Adjust main content for desktop to shift for static sidebar */
        @media(min-width: 769px) {
            margin-left: 374px; /* Space for the permanent sidebar on desktop */
        }
    }
`;
const HeaderTitle = styled.h1`
    font-size: 3.8rem;
    font-weight: 700;
    color: var(--color-accent);
    margin-bottom: 20px;
    text-align: center;
    user-select: none;
`;
