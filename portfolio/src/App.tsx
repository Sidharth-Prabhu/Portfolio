import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ShOS from './components/ShOS/ShOS';
import BlogIndex from './components/Blog/BlogIndex';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (hash === '#shos') {
    return <ShOS onClose={() => window.location.assign('#')} />;
  }

  if (hash === '#blog' || hash.startsWith('#blog/')) {
    return (
      <div className="App">
        <Navbar />
        <BlogIndex />
      </div>
    );
  }

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
