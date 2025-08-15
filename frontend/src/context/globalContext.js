import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + '/api/';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // --- Income CRUD ---
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}auth/add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}auth/get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}auth/delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const totalIncome = () => incomes.reduce((acc, income) => acc + income.amount, 0);

  // --- Expense CRUD ---
  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}auth/add-expense`, expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}auth/get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}auth/delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  const totalExpenses = () => expenses.reduce((acc, expense) => acc + expense.amount, 0);

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

export const useGlobalContext = () => useContext(GlobalContext);
