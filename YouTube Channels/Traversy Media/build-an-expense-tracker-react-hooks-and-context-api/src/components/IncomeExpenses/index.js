import React, { useContext } from 'react'

import { GlobalContext } from "../../context/GlobalState";
import { formatCurrency } from "../../misc/CurrencyFormat";

export default function IncomeExpenses() {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts
        .filter(item => Math.sign(item) === 1)
        .reduce((acc, item) => (acc += item), 0);

    const expense = amounts
        .filter(item => Math.sign(item) === -1)
        .reduce((acc, item) => (acc -= item), 0);

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">{formatCurrency("pt-BR", "BRL", income.toFixed(2).toString())}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">{formatCurrency("pt-BR", "BRL", expense.toFixed(2).toString())}</p>
            </div>
        </div>
    )
}
