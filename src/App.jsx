import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import OtherPages from './pages/OtherPages';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Main */}
        <Route path="/" element={<Home />} />

        {/* Profile */}
        <Route path="/profile/:slug" element={<Profile />} />

        {/* Static pages */}
        <Route path="/about" element={<OtherPages />} />
        <Route path="/services" element={<OtherPages />} />
        <Route path="/payment" element={<OtherPages />} />
        <Route path="/digital-business-card" element={<OtherPages />} />

        {/* Directory */}
        <Route path="/:country/:city/:language" element={<Home />} />

        <Route path="/:country/:city/:language/:category" element={<Home />} />

        <Route path="/:country/:city/:language/:category/:letter" element={<Home />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
