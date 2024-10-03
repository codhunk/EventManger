import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AddEvent from "../Components/AddEvent/AddEvent";
import ViewEvent from "../Components/ViewEvent/ViewEvent";
const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home element={<AddEvent />} />} />
          <Route path="/events" element={<Home element={<ViewEvent />} />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
