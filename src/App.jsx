import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import ImgSolo from "./pages/ImgSolo/ImgSolo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/img-solo" element={<ImgSolo />} />
    </Routes>
  );
}

export default App;
