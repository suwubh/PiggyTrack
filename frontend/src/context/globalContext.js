import React, { useContext, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // --------- Incomes ---------
  const addIncome = async (income) => {
    try {
      await axios.post(`${API}/add-income`, income);
      getIncomes();
    } catch (err) {
      console.error("addIncome error:", err);
      setError(err?.response?.data?.message || "Failed to add income");
    }
  };

  const getIncomes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/income`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch incomes");
      const data = await res.json();
      setIncomes(data);
    } catch (err) {
      console.error("getIncomes error:", err);
      setIncomes([]); // fallback
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${API}/delete-income/${id}`);
      getIncomes();
    } catch (err) {
      console.error("deleteIncome error:", err);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((sum, income) => sum + income.amount, 0);
  };

  // --------- Expenses ---------
  const addExpense = async (expense) => {
    try {
      await axios.post(`${API}/add-expense`, expense);
      getExpenses();
    } catch (err) {
      console.error("addExpense error:", err);
      setError(err?.response?.data?.message || "Failed to add expense");
    }
  };

  const getExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("getExpenses error:", err);
      setExpenses([]); // fallback
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API}/delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      console.error("deleteExpense error:", err);
    }
  };

  const totalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  // --------- Balance & History ---------
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
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
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

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
