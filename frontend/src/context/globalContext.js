import React, { useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";

// Ensure REACT_APP_API_URL points to your *backend* service URL in Render environment variables
const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // State to store user data

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: `${API_BASE}/api/v1`, // Ensure this matches your backend mounting point
    });
    instance.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return instance;
  }, [token]);

  // Function to fetch user data
  const getUserData = async () => {
    try {
      const { data } = await api.get(`/dashboard`); // Assuming /api/v1/dashboard returns user info
      setUser(data.user);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null);
      // Optionally clear token if user data fetching fails (e.g., token expired)
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
  };

  // Fetch user data on component mount or token change
  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setUser(null); // Clear user if no token
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Dependency on token ensures re-fetch if token changes


  // Income
  const addIncome = async (income) => {
    try {
      const payload = { ...income, amount: Number(income.amount) };
      await api.post(`/income`, payload); // Use /income, not /add-income
      await getIncomes();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const getIncomes = async () => {
    try {
      const { data } = await api.get(`/income`); // Use /income, not /get-incomes
      setIncomes(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await api.delete(`/income/${id}`);
      await getIncomes();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const totalIncome = () => incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);

  // Expenses
  const addExpense = async (expense) => {
    try {
      const payload = { ...expense, amount: Number(expense.amount) };
      await api.post(`/expenses`, payload); // Use /expenses, not /add-expense
      await getExpenses();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const getExpenses = async () => {
    try {
      const { data } = await api.get(`/expenses`); // Use /expenses, not /get-expenses
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      await getExpenses();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const totalExpenses = () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        user, // Expose user data
        getUserData, // Expose function to re-fetch user data if needed
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
