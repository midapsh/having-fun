import React, { useContext } from 'react'

import { GlobalContext } from "../../context/GlobalState";
import { formatCurrency } from "../../misc/CurrencyFormat";

export default function Balance() {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>{formatCurrency("pt-BR", "BRL", total.toFixed(2).toString())}</h1>
        </>
    )
}
