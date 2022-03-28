import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import EmployeePage from "./Pages/EmployeePage";
import DepartmentPage from "./Pages/DepartmentPage";
import EditEmployeePage from "./Pages/EditEmployeePage";
import EditDepartmentPage from "./Pages/EditDepartmentPage";
import NewEmployeePage from "./Pages/NewEmployeePage";
import UsersPage from "./Pages/UsersPage";
import ShiftsPage from "./Pages/ShiftsPage";
import NewDepartmentPage from "./Pages/NewDepartmentPage";
function App() {
  const dispatch = useDispatch();

  useEffect(async () => {
    let resp = await axios.get("http://127.0.0.1:5000/getAllFactory");
    dispatch({ type: "LOAD", payload: resp.data });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mainPage" element={<MainPage />}>
          <Route path="/mainPage/employeesPage" element={<EmployeePage />} />
          <Route
            path="/mainPage/editemployeePage/:id"
            element={<EditEmployeePage />}
          />
          <Route
            path="/mainPage/newemployeePage"
            element={<NewEmployeePage />}
          />
          <Route
            path="/mainPage/departmentsPage"
            element={<DepartmentPage />}
          />
          <Route
            path="/mainPage/editdepartmentPage/:dName"
            element={<EditDepartmentPage />}
          />
          <Route
            path="/mainPage/newdepartmentPage"
            element={<NewDepartmentPage />}
          />

          <Route path="/mainPage/shiftsPage" element={<ShiftsPage />} />
          <Route path="/mainPage/usersPage" element={<UsersPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
