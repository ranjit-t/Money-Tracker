import React from "react";

export default function MoneyTracker({ authed }) {
  console.log(authed);
  return (
    <div className="App">
      <div className="header">
        <h2>MoneyTracker</h2>
      </div>

      {authed ? (
        <div className="money-tracker">
          <p>Hello You are Logged in and this is Your Data</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            itaque optio quod culpa earum, a, iste debitis iusto neque
            aspernatur nisi, sequi consequuntur dolor ullam soluta maiores
            eligendi illum obcaecati.
          </p>
        </div>
      ) : (
        <div className="money-tracker">
          <a href="/login">Please Log in to View This Page</a>
          {/* <p>Please Log in to View This Page</p> */}
        </div>
      )}
    </div>
  );
}
