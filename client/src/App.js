import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../src/pages/SignUp'
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import SearchResultsPage from "./pages/SearchResultsPage";
import Login from "./pages/Login";
import Homepage from "./pages/userHomepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="*"
            element={<Navigate to="/Home" replace />}
          />
          <Route
            path="/Home"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path='/sign-up'
            element={<Signup />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route 
          path="/search/:query" 
          element={<SearchResultsPage />} />
          <Route
            path='/userHomepage'
            element={<Homepage/>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
