# PiggyTrack

A simple, privacy-first **personal finance tracker** built with the MERN stack.

Live demo: [https://piggytrack-vbyp.onrender.com](https://piggytrack-vbyp.onrender.com)

---

## Table of Contents

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Screenshots](#screenshots)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Environment variables](#environment-variables)
  * [Run locally](#run-locally)
* [API Endpoints (summary)](#api-endpoints-summary)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## About

**PiggyTrack** is a lightweight personal finance dashboard that helps you record incomes and expenses, visualize trends, and export transaction data. The app emphasizes clarity, responsiveness, and a small footprint so you can track money quickly on both desktop and mobile.

---

## Features

* Signup / Login (JWT)
* Add, edit, and delete transactions (income & expense)
* Dashboard with totals (income, expense, balance)
* Recent transactions list
* Time-series charts (income vs expense)
* Export transactions to Excel (XLSX)
* Responsive UI for mobile and desktop

---

## Tech Stack

* **Frontend:** React
* **Backend:** Node.js + Express
* **Database:** MongoDB (Mongoose)
* **Auth:** JSON Web Tokens (JWT)
* **Utilities:** Axios, SheetJS (XLSX)

> The repository is split into `frontend/` and `backend/` folders (typical MERN layout).

---

## Screenshots

*(Add screenshots in the `screenshots/` folder and reference them here.)*

---

## Getting Started

### Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* MongoDB (Atlas or local)

### Environment variables

Create a `.env` file in the `backend/` folder with the following values (example):

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

If the frontend needs an environment file, set the API base URL there (example `.env` in `frontend/`):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

(Adjust names according to the actual implementation in your repo.)

### Run locally

**Backend**

```bash
cd backend
npm install
# create .env as shown above
npm run dev    # or `npm start` depending on package.json
```

**Frontend**

```bash
cd frontend
npm install
# ensure API base URL is configured in frontend env
npm run dev    # or `npm start`
```

Open the frontend (typically at `http://localhost:3000`) to use the app.

---

## API Endpoints (summary)

> Short reference — adapt to actual routes in your backend.

* `POST /api/auth/register` — Register a user
* `POST /api/auth/login` — Login and receive a JWT
* `GET /api/transactions` — Get user's transactions
* `POST /api/transactions` — Create a transaction
* `PUT /api/transactions/:id` — Update a transaction
* `DELETE /api/transactions/:id` — Delete a transaction

---

## Roadmap

Planned improvements:

* Budgets & alerts
* Category analytics (pie / donut charts)
* Recurring transactions
* Multi-currency support
* Tests (Jest + supertest / Cypress)
* Better accessibility & internationalization

---

## Contributing

Contributions are welcome! Suggested workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make changes and add tests where appropriate
4. Open a Pull Request describing your changes

Please open an issue first for larger features so we can discuss approach and API changes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

## Contact

Repo: [https://github.com/suwubh/PiggyTrack](https://github.com/suwubh/PiggyTrack)

Maintainer: suwubh

Feel free to open issues or pull requests.

---

*Thanks for building PiggyTrack — happy budgeting!*
