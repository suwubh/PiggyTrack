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
        overflow: hidden; /* This might need adjustment for mobile; consider 'auto' or 'unset' on specific elements */
        color: rgba(34, 34, 96, .6);
    }
    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }
    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }

    /* === START OF MOBILE RESPONSIVENESS ADDITIONS === */

    /* General media query for screens up to 768px (common tablet breakpoint) */
    @media screen and (max-width: 768px) {
        body, html {
            /* Adjust body font size */
            font-size: 14px; 
            /* You might need to change 'overflow: hidden;' in body for mobile scrolling */
            overflow: auto; /* Allow scrolling on smaller screens */
        }
        
        main { /* Refers to the <main> tag in App.js */
            padding: 10px; /* Reduce padding on smaller screens */
        }

        /* Dashboard/General layout adjustments */
        .stats-con { /* Found in DashboardStyled */
            grid-template-columns: repeat(1, 1fr) !important; /* Stack items vertically */
            gap: 1rem !important; /* Reduce gap */
        }

        .amount-con { /* Found in DashboardStyled */
            grid-template-columns: repeat(1, 1fr) !important; /* Stack amount boxes vertically */
            gap: 1rem !important; /* Reduce gap */
        }

        .income, .expense, .balance { /* Found in DashboardStyled */
            grid-column: span 1 !important; /* Ensure they take full width */
            font-size: 1.5rem !important; /* Example: Reduce font size for these boxes */
            padding: 0.5rem !important; /* Reduce padding */
        }

        h1, h2 { /* General headings */
            font-size: 1.5rem !important; /* Smaller headings for general use */
        }

        /* Specific adjustments for Income/Expense total summaries */
        .total-income, .total-expense {
            font-size: 1.5rem !important;
            span {
                font-size: 2rem !important; /* Adjust the size of the amount itself */
            }
        }

        /* Adjust font size for min/max salary/expense items */
        .salary-item p { /* Found in DashboardStyled */
            font-size: 1rem !important; /* Smaller text for these */
        }

        /* Layout for Income/Expense content sections */
        .income-content, .expense-content {
            flex-direction: column; /* Stack form and items vertically */
            gap: 1.5rem; /* Adjust gap between stacked items */
        }

        /* Form container within income/expense sections */
        .form-container {
            width: 100%; /* Ensure form takes full width available */
            padding: 0.8rem; /* Adjust padding if needed */
        }

        /* Item lists (incomes/expenses) */
        .incomes, .expenses {
            width: 100%; /* Ensure the list takes full width */
            padding: 0; /* Remove extra padding if present */
        }

        /* Navigation adjustments for mobile */
        nav { /* Assuming your Navigation component is a <nav> tag */
            width: 100% !important; /* Make nav full width on mobile */
            height: auto !important; /* Auto height */
            position: fixed !important; /* Keep it fixed at top/bottom */
            bottom: 0 !important; /* Place at bottom of screen */
            left: 0 !important;
            right: 0 !important;
            flex-direction: row !important; /* Arrange items horizontally */
            justify-content: space-around !important; /* Distribute items evenly */
            padding: 0.5rem !important;
            border-top-left-radius: 20px !important; /* Round top corners */
            border-top-right-radius: 20px !important;
            border-bottom-left-radius: 0 !important; /* Remove bottom corners */
            border-bottom-right-radius: 0 !important;
            z-index: 100; /* Ensure it's on top */
            background: #FCF6F9; /* Match your app background */
            box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.06); /* Shadow at the top */
        }
        nav .user-con { /* Adjust user info in navigation */
            display: none !important; /* Hide user info on small screens */
        }
        nav .menu-items {
            flex-direction: row !important; /* Horizontal menu items */
            width: 100% !important;
            justify-content: space-around !important;
            padding: 0 !important;
        }
        nav .menu-items li {
            margin: 0 !important; /* Remove vertical margins */
            padding: 0.5rem 0.2rem !important; /* Adjust padding */
        }
        nav .bottom-nav-btn { /* Assuming a logout or similar button at bottom */
            display: none !important; /* Hide on mobile if navigation is at bottom */
        }

        /* Adjust main layout to accommodate fixed bottom nav */
        .main-layout { /* Assuming MainLayout is a class or component that applies these styles */
            padding-bottom: 60px; /* Add space for the fixed bottom navigation */
            padding-top: 1rem; /* Adjust top padding if needed */
        }
    }

    /* Optional: Further adjustments for very small mobile screens (e.g., max-width: 480px) */
    @media screen and (max-width: 480px) {
        /* You can add more specific rules here if needed */
    }
    /* === END OF MOBILE RESPONSIVENESS ADDITIONS === */
`;
