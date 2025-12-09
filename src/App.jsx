import "react-image-crop/dist/ReactCrop.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Review from "./pages/Review";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reviews/:id" element={<Review />} />
        <Route path="/userInfo" element={<Profile />} />
      </Route>
    </Routes>
  );
}
