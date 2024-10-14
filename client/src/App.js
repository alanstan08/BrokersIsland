import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../src/pages/SignUp'
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import SearchResultsPage from "./pages/SearchResultsPage";
import Login from "./pages/Login";
import Homepage from "./pages/userHomepage";
import BrokerHomepage from "./pages/brokerhomepage";
import DiversePropertyPortfolio from "./pages/DiversePropertyPortfolio"
import StreaminedInvestmentProcess from "./pages/StreaminedInvestmentProcess";
import StandardBrokerageCosts from "./pages/StandardBrokerageCosts";

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
          <Route
            path='/brokerHomepage'
            element={<BrokerHomepage/>}
          />
          <Route
            path='/diversepropertyportfolio'
            element={<DiversePropertyPortfolio/>}
          />
          <Route
            path='/streamlinedinvestprocess'
            element={<StreaminedInvestmentProcess/>}
          />
          <Route
            path='/standardbrokeragecosts'
            element={<StandardBrokerageCosts/>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
