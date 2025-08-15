import React, { useContext, useMemo, useState } from "react";
import axios from "axios";

// FIXED: Removed backslashes from variable names and corrected the regex
const API_BASE = (process.env.REACT_APP_API_URL || "https://piggytrack.onrender.com").replace(/\/+$/, "");

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const api = useMemo(() => {
    const instance = axios.create({
      // FIXED: Added backticks for template literal
      baseURL: `${API_BASE}/api`,
    });
    instance.interceptors.request.use((config) => {
      // FIXED: Added backticks for template literal
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return instance;
  }, [token]);

  // Income
  const addIncome = async (income) => {
    try {
      const payload = { ...income, amount: Number(income.amount) };
      // FIXED: Added quotes and backticks to the path
      await api.post(`/income`, payload);
      await getIncomes();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const getIncomes = async () => {
    try {
      // FIXED: Added quotes to the path
      const { data } = await api.get(`/income`);
      setIncomes(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const deleteIncome = async (id) => {
    try {
      // FIXED: Added backticks to the path
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
      // FIXED: Added quotes and backticks to the path
      await api.post(`/expenses`, payload);
      await getExpenses();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const getExpenses = async () => {
    try {
      // FIXED: Added quotes to the path
      const { data } = await api.get(`/expenses`);
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const deleteExpense = async (id) => {
    try {
      // FIXED: Added backticks to the path
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
