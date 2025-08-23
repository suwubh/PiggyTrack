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

/* Mobile Responsiveness */
@media screen and (max-width: 768px) {
  body, html {
    font-size: 14px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  main {
    padding: 10px;
    margin-left: 0 !important; /* Override any desktop margin */
  }

  /* Dashboard Grid Fixes */
  .stats-con {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .chart-con, .history-con {
    grid-column: 1 / -1 !important;
  }

  .amount-con {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
    margin-top: 1rem !important;
  }

  .income, .expense, .balance {
    grid-column: 1 / -1 !important;
    font-size: 1.2rem !important;
    padding: 1rem !important;
  }

  .balance {
    grid-column: 1 / -1 !important; /* Override the desktop 2/4 span */
  }

  /* Text scaling */
  h1, h2 {
    font-size: 1.5rem !important;
  }

  .total-income, .total-expense {
    font-size: 1.5rem !important;
  }

  .total-income span, .total-expense span {
    font-size: 2rem !important;
  }

  .salary-item p {
    font-size: 1rem !important;
  }

  /* Form and content layouts */
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
  /* Additional overrides for very small screens */
  .amount-con {
    gap: 0.8rem !important;
  }
  
  .income, .expense, .balance {
    padding: 0.8rem !important;
  }
}
`;
