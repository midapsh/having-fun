import React, { useContext } from 'react'

import Transaction from "../Transaction";

import { GlobalContext } from "../../context/GlobalState";


export default function TransactionList() {
    const { transactions } = useContext(GlobalContext);
    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        id={transaction.id}
                        text={transaction.text}
                        amount={transaction.amount}
                    />
                ))}
            </ul>
        </>
    )
}
