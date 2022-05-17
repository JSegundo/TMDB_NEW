import React from "react";
import ReactDOM from "react-dom";
import "../src/assets/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import UserProvider from "../src/context/UserContext";

const Root = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
};

export default ReactDOM.render(<Root />, document.getElementById("root"));
