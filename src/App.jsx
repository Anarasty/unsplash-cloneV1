import { Route, Routes } from "react-router";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import ImgSolo from "./pages/ImgSolo/ImgSolo";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/tags/:tag" element={<Home />} />
            <Route path="/photos/:photoId" element={<ImgSolo />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
