import React, { useState } from "react";
import './App.css';
import Header from "./components/Header";
import UserContext from "./store/UserContext";

function App() {


  return (
    <>
      <UserContext.Provider value={"짱구"}>
        <Header>
        </Header>
      </UserContext.Provider>
    </>
  );
}
export default App;