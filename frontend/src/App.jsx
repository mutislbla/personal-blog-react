import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import AddPost from "./pages/addPost";
import CategoryPage from "./pages/category";
import EditPost from "./pages/editPost";
import Navbar from "./components/navbar";
import PostDetailPage from "./pages/postDetail";
import LoginRoute from "./utils/loginRoute";
import Dashboard from "./pages/dashboard/";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route
            path={"/home"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <HomePage />
                </LoginRoute>
              </>
            }
          />
          <Route
            path={"/post/add"}
            element={
              <>
                <LoginRoute>
                  <AddPost />
                </LoginRoute>
              </>
            }
          />
          <Route path={"/post/category/:category"} element={<CategoryPage />} />
          <Route
            path={"/post/edit/:id"}
            element={
              <>
                <LoginRoute>
                  <EditPost />
                </LoginRoute>
              </>
            }
          />
          <Route path={"/post/detail/:id"} element={<PostDetailPage />} />
          <Route
            path="/dashboard"
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <Dashboard />
                </LoginRoute>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
