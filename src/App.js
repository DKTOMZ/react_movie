import React from "react";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

const App = () => { 
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/movieinfo/:movie" element={<InfoPage />}></Route>
        </Routes>
    );
}

export default App;