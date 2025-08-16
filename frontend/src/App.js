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
                    <HeaderTitle>PiggyTrack</HeaderTitle>
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

const HeaderTitle = styled.h1`
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-accent);
    margin-bottom: 20px;
    text-align: center;
    user-select: none;
`;
