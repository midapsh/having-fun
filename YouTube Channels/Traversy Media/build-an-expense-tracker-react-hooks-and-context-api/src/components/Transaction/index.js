import React, { useContext } from 'react'

import { GlobalContext } from "../../context/GlobalState";

import { formatCurrency } from "../../misc/CurrencyFormat";

export default function Transaction({ id, text, amount }) {
    const { deleteTransaction } = useContext(GlobalContext);
    return (
        <li className={Math.sign(amount) === 1 ? "plus" : "minus"}>
            {text} <span>{formatCurrency("pt-BR", "BRL", amount.toFixed(2).toString())}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(id)}>x</button>
        </li>
    )
}
