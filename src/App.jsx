import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import DynamicCategory from "./pages/DynamicCategory";
import SinglePage from "./pages/SinglePage";
import Profile from "./pages/Menu/Profile";
import Setting from "./pages/Menu/Setting";
import Posts from "./pages/Menu/Posts";
import Comments from "./pages/Menu/Comments";
import Upvoted from "./pages/Menu/Upvoted";
import Downvoted from "./pages/Menu/Downvoted";
import Overview from "./pages/Menu/Overview";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<Profile />}>
              <Route path="overview" element={<Overview />} />
              <Route path="submitted" element={<Posts />} />
              <Route path="comments" element={<Comments />} />
              <Route path="upvoted" element={<Upvoted />} />
              <Route path="downvoted" element={<Downvoted />} />
            </Route>
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
