import { Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home";

// PLACEHOLDER imports for now
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import Review from "./pages/Review";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route index element={<Home />} />

        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="profile" element={<Profile />} /> */}
        {/* <Route path="review" element={<Review />} /> */}
      </Route>
    </Routes>
  );
}