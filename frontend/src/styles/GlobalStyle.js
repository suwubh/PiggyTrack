// File: src/styles/GlobalStyle.js

import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }
    :root{
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
    }
    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow-x: hidden;
        overflow-y: auto;
        color: rgba(34, 34, 96, .6);
    }
    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }
    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{ transform: translateX(0); }
            25%{ transform: translateX(10px); }
            50%{ transform: translateX(-10px); }
            75%{ transform: translateX(10px); }
            100%{ transform: translateX(0); }
        }
    }

    @media screen and (max-width: 768px) {
        body, html {
            font-size: 14px; 
            overflow-x: hidden;
            overflow-y: auto;
        }
        
        main { 
            padding: 10px; 
        }

        /* Crucial rules for dashboard layout stacking */
        .stats-con, .amount-con {
            display: grid !important; /* Ensure display is grid */
            grid-template-columns: 1fr !important; /* Stack everything in a single column */
            gap: 1rem !important;
        }

        .income, .expense, .balance, .chart-con, .history-con {
            grid-column: 1 / -1 !important; /* Ensure each item spans the full single column */
        }
        
        .income, .expense, .balance { 
            font-size: 1.5rem !important; 
            padding: 0.5rem !important; 
        }

        h1, h2 { 
            font-size: 1.5rem !important; 
        }

        .total-income, .total-expense {
            font-size: 1.5rem !important;
            span {
                font-size: 2rem !important;
            }
        }

        .salary-item p { 
            font-size: 1rem !important; 
        }

        .income-content, .expense-content {
            display: flex;
            flex-direction: column; 
            gap: 1.5rem; 
        }

        .form-container, .incomes, .expenses {
            width: 100%;
            padding: 0; 
        }
        
        .form-container {
             padding: 0.8rem;
        }
    }

    @media screen and (max-width: 480px) {
        /* You can add further overrides for very small phones here */
    }
`;
