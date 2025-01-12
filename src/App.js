import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import Home from "./pages/Home/Home";
import CounterPage from "./pages/CounterPage/couterPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

const About = () => {
  return <h1>소개 페이지</h1>;
};

const NotFound = () => {
  return <h1>페이지를 찾을 수 없습니다</h1>;
};

export default App;
