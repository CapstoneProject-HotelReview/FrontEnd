import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review" element={<Review />} />
      </Route>
    </Routes>
  );
}
