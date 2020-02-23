import React, { useState, useContext } from 'react'
import { GlobalContext } from "../../context/GlobalState";

import { guidGenerator } from "../../context/IDGenerator";

export default function AddTransaction() {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("0");
    const { transactions, addTransaction } = useContext(GlobalContext);

    
    async function handleSubmit(event){
        event.preventDefault();
        const newTransaction = {
            id: guidGenerator(transactions),
            text,
            amount: Number(amount),
        };
        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
