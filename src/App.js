import './App.css';
import './styles/line_loader.css'
import React, { useState, useEffect } from 'react';
import { LoadingPage} from './components/LoadingPage';
import { SearchPage} from './components/SearchPage';
import './styles/search-page.css';
import './styles/loading_ring.css';


function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='App'>
      {showLogo && (
        <>
        <LoadingPage/>
        </>
      )}
      {!showLogo && (
        <>
          <SearchPage/>
        </>
      )}
    </div>
  );
}


export default App;
