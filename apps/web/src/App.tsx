import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";


export default function App() {
  return (

    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/register" replace/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

        <Route element={<Protected/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
