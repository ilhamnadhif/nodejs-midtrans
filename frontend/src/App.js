import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ListOrder from "./pages/ListOrder";

function App() {
  return (
    // <Home />
    <Router>
      <Routes>
        <Route path="/order" element={<ListOrder />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
