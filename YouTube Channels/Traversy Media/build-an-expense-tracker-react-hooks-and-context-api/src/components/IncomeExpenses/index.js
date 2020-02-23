import React from 'react'

export default function IncomeExpenses() {
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">+R$0,00</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">-R$0,00</p>
            </div>
        </div>
    )
}
