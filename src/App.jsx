import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import DynamicCategory from "./pages/DynamicCategory";
import SinglePage from "./pages/SinglePage";
import Profile from "./pages/Menu/Profile";
import Setting from "./pages/Menu/Setting";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Setting />} />
            <Route path="/:name/:id" element={<DynamicCategory />} />
            <Route path="/:name/:id/:postId" element={<SinglePage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
