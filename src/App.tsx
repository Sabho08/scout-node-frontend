import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductComparison from './pages/ProductComparison';
import UserProfile from './pages/UserProfile';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AffiliateDisclaimer from './pages/AffiliateDisclaimer';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<SearchResults />} />
          <Route path="/trending" element={<SearchResults />} />
          <Route path="/deals" element={<SearchResults />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/compare/:id" element={<ProductComparison />} />
          <Route path="/compare" element={<ProductComparison />} />
          {/* New Footer Content Routes */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<AffiliateDisclaimer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
