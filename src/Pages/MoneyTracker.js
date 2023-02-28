import React, { useState, useEffect } from "react";

export default function MoneyTracker({ authed, UID }) {
  // console.log(authed);
  // console.log(UID);
  const [desciption, setDesciption] = useState("");
  const [amount, setAmount] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const computedTotal = allTransactions.reduce(
      (acc, trans) => acc + parseInt(trans.amount),
      0
    );
    setTotalAmount(computedTotal);
  }, [allTransactions]);

  return (
    <div className="App">
      <div className="header">
        <h2>Money Tracker</h2>
      </div>

      {authed ? (
        <div className="money-tracker">
          <div className="transactions-list">
            <h3>Transactions List</h3>
            <div
              className={
                totalAmount > 0 ? "total-balance plus" : "total-balance minus"
              }
            >
              <span>
                <b>Total Balance : </b>
              </span>
              <span>{parseFloat(totalAmount).toFixed(2)}€</span>
            </div>
            {allTransactions.map((trans, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    trans.amount > 0
                      ? "each-transaction plus"
                      : "each-transaction minus"
                  }
                >
                  <span className="description">{trans.desciption}</span>
                  <span className="amount">{trans.amount}€</span>
                </div>
              );
            })}
          </div>
          <div>
            <h3>New Transaction</h3>
            <form
              className="transaction-form"
              onSubmit={(e) => {
                e.preventDefault();
                const transaction = {
                  amount: parseFloat(amount).toFixed(2),
                  desciption: desciption,
                  UID: UID,
                };

                setAllTransactions([...allTransactions, transaction]);
                console.log(allTransactions);
                setAmount("");
                setDesciption("");
              }}
            >
              <input
                type="text"
                placeholder="Transcation Description"
                value={desciption}
                onChange={(e) => {
                  setDesciption(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Enter Amount (€)"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <button className="trans-btn">Add Transaction</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="money-tracker-not-logged">
          <a href="/login">Please Log in to View This Page</a>
          {/* <p>Please Log in to View This Page</p> */}
        </div>
      )}
    </div>
  );
}
