import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;

    @media screen and (max-width: 768px) {
        padding: 1rem;
        gap: 1rem;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;

    @media screen and (max-width: 768px) {
        padding: 1rem 0.5rem;
    }
`;
