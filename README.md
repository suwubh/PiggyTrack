PiggyTrack – Personal Finance Dashboard (MERN)
PiggyTrack is a full‑stack personal finance tracker built with the MERN stack. It lets users add incomes and expenses, view trends, and understand monthly balance with a clean, responsive UI. It’s designed to be fast, privacy‑friendly, and easy to extend.

Live: (https://piggytrack-vbyp.onrender.com)


Features
Authentication with JWT (signup/login)

Add, view, and delete incomes and expenses

Dashboard with totals (income, expense, balance)

Recent transactions widget

Interactive line chart (income vs expense)

Combined transactions timeline

Export data to Excel (XLSX)

Responsive design with mobile drawer navigation

Accessible, consistent forms (labels, validation, styled date picker)

Tech Stack
Frontend: React 18, Context API, styled-components, react-chartjs-2, chart.js, react-datepicker

Backend: Node.js, Express, JWT (jsonwebtoken), bcryptjs

Database: MongoDB (Mongoose)

Utilities: Axios, XLSX (SheetJS), file-saver

Deployment: add your deployment targets (e.g., Render, Vercel, Netlify)

Project Structure
backend/

app.js – Express app bootstrap, CORS, routes, error handler

db/db.js – MongoDB connection via Mongoose

middleware/authMiddleware.js – JWT validation; sets req.userId

models/User.js – User schema (name, email, password)

models/Income.js – Income schema (title, amount, category, description, date, user)

models/Expense.js – Expense schema (title, amount, category, description, date, user)

routes/auth.js – /auth/signup, /auth/login

routes/income.js – /income GET/POST/DELETE/:id

routes/expenses.js – /expenses GET/POST/DELETE/:id

routes/dashboard.js – /dashboard (current user info, extendable)

controllers/income.js – add/get/delete income (scoped to user)

controllers/expense.js – add/get/delete expense (scoped to user)

frontend/

src/

index.js – App root with GlobalProvider and styles

App.js – Layout, auth gate, page switching (Dashboard/Transactions/Income/Expenses)

context/globalContext.js – Global state, Axios API, derived totals/history

styles/GlobalStyle.js, styles/Layouts.js – Theme and responsive layout

utils/dateFormat.js – Moment-based date formatting

utils/Icons.js, utils/menuItems.js – UI icons and navigation config

Components/

Auth/ – Login, Signup, AuthPage

Navigation/, ResponsiveNavigation/ – Sidebar + mobile drawer

Dashboard/, Chart/ – Dashboard cards and line chart

Income/, Expenses/ – Pages and item cards

Transactions/ – Merged timeline

Form/ – Add Income form (and Expenses/ExpenseForm)

ExportToExcelButton/ – One-click Excel export


API Overview
Base URL: /api/v1

Auth

POST /auth/signup – { name, email, password } → { user, token }

POST /auth/login – { email, password } → { user, token }

Incomes (requires Authorization: Bearer <token>)

GET /income – list incomes for current user

POST /income – { title, amount, category, description, date } → create income

DELETE /income/:id – delete if owned by user

Expenses (requires Authorization)

GET /expenses – list expenses for current user

POST /expenses – { title, amount, category, description, date } → create expense

DELETE /expenses/:id – delete if owned by user

Dashboard (requires Authorization)

GET /dashboard – returns current user (extendable for aggregates)

Frontend Data Flow
Forms call context methods (addIncome/addExpense)

Axios instance injects JWT via interceptor

Context refreshes lists after writes

Derived selectors compute totals, balance, and recent history

Charts align income/expense series by date


Auth pages

Dashboard totals + chart

Income/Expense forms and lists

Transactions timeline

Excel export

Key Implementation Details
Security

JWT auth; protected routes check Bearer token

Per-user scoping via req.userId on all reads/writes

Ownership check on delete (id + user)

CORS restricted via CLIENT_URL in production

Validation

Server-side checks for required fields and positive numeric amounts

Client-side required fields and basic feedback

Performance

Sorted queries by createdAt; use lean() where applicable

Recommended indexes: { user: 1, createdAt: -1 } on Income/Expense

UX

Consistent spacing and alignment across inputs/select/textarea

Responsive layout with mobile drawer navigation

Accessible labels for inputs

Roadmap
Budgets with progress and alerts

Category analytics (pie/donut; top categories)

Pagination and advanced filters (date range, category)

Recurring transactions

Multi-currency support

Swagger/OpenAPI docs

Test suite (Jest + supertest, Cypress)

Rate limiting for auth, helmet for security headers

Scripts
Backend:

npm run dev – start with nodemon

npm start – start production server

Frontend:

npm start – start React dev server

npm run build – production build

Contributing
Fork the repo

Create a feature branch

Commit with clear messages

Open a PR describing the change and testing steps



react-datepicker

SheetJS (xlsx) and file-saver
