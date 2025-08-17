// File: src/styles/Layouts.js

import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;

    /* --- START OF MOBILE RESPONSIVENESS FIX --- */
    @media screen and (max-width: 768px) {
        flex-direction: column; /* Stack navigation and main content vertically */
        padding: 1rem; /* Reduce padding on mobile */
        gap: 1rem; /* Reduce gap between elements */
    }
    /* --- END OF MOBILE RESPONSIVENESS FIX --- */
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;

    /* --- START OF MOBILE RESPONSIVENESS FIX --- */
    @media screen and (max-width: 768px) {
        padding: 1rem 0.5rem; /* Reduce padding inside components on mobile */
    }
    /* --- END OF MOBILE RESPONSIVENESS FIX --- */
`;
