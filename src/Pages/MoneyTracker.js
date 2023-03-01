import React, { useState, useEffect } from "react";
import { db } from "../config";
import { getDocs, collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

//Icons
import { FaTrash } from "react-icons/fa";

export default function MoneyTracker({ authed, UID }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetching From Firebase

  const fetchPost = async () => {
    await getDocs(collection(db, "transactions")).then((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        // console.log(doc.id);
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      setAllTransactions(
        newData.filter((trans) => {
          return trans.UID === UID;
        })
      );
      // setAllTransactions(newData);
    });
  };
  // fetchPost();
  useEffect(() => {
    fetchPost();
  }, []);

  // Adding Data to FireBase

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = {
      amount: parseFloat(amount).toFixed(2),
      description: description,
      UID: UID,
    };

    try {
      await addDoc(collection(db, "transactions"), transaction);
      fetchPost();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // setAllTransactions([...allTransactions, transaction]);
    setAmount("");
    setDescription("");
  };

  // Deleting Data

  const handleDelete = async (id) => {
    try {
      const ref = doc(db, "transactions", id);
      await deleteDoc(ref);
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  };

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
                  <span className="description">{trans.description}</span>
                  <span className="amount">{trans.amount}€</span>
                  <span className="icons">
                    <FaTrash
                      onClick={() => {
                        handleDelete(trans.id);
                      }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <h3>New Transaction</h3>
            <form className="transaction-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Transaction Description"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Enter Amount (€)"
                required
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
