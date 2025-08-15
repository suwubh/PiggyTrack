import React, { useContext, useState } from "react";
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Calculate incomes
    const addIncome = async (income) => {
        try {
            await axios.post(`${API}/add-income`, income);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    const getIncomes = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API}/income`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setIncomes(data);
    };

    const deleteIncome = async (id) => {
        await axios.delete(`${API}/delete-income/${id}`);
        getIncomes();
    };

    const totalIncome = () => incomes.reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate expenses
    const addExpense = async (expense) => {
        try {
            await axios.post(`${API}/add-expense`, expense);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    const getExpenses = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API}/expenses`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setExpenses(data);
    };

    const deleteExpense = async (id) => {
        await axios.delete(`${API}/delete-expense/${id}`);
        getExpenses();
    };

    const totalExpenses = () => expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const totalBalance = () => totalIncome() - totalExpenses();

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
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
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
