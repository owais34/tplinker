import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<h1>oooks</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
