import React from 'react'

import { formatCurrency } from "../../misc/CurrencyFormat";

export default function Transaction({ text, amount }) {
    return (
        <li className={Math.sign(amount) === 1 ? "plus" : "minus"}>
            {text} <span>{formatCurrency("pt-BR", "BRL", amount.toFixed(2).toString())}</span><button className="delete-btn">x</button>
        </li>
    )
}
