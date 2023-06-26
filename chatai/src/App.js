import React from "react";

import "./App.scss";
import Home from "./Components/Home";
import { AppContext } from "./context/contextApi";

function App() {
  
  return (
    <>
      <AppContext>
        <Home></Home>
      </AppContext>
    </>
  );
}

export default App;

