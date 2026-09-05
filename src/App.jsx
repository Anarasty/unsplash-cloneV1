import { Route, Routes } from "react-router";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ImgSolo from "./pages/ImgSolo/ImgSolo";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:tag" element={<Home />} />
          <Route path="/photos/:photoId" element={<ImgSolo />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
