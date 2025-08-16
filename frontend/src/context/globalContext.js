// File: frontend/src/context/globalContext.js (Cleaned and adjusted)

import React, { useContext, useMemo, useState } from "react";
import axios from "axios";

// Ensure REACT_APP_API_URL points to your *backend* service URL in Render environment variables
const API_BASE = (process.env.REACT_APP_API_URL || "https://piggytrack.onrender.com").replace(/\/+$/, "");

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
