import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getJoke } from './redux/jokeSlice';

function App() {
  const dispatch = useAppDispatch();
  const joke = useAppSelector(state => state.joke.data);

  const [setup, setSetup] = useState<string | null>(null);
  const [punchline, setPunchline] = useState<string | null>(null);
  const [showPunchline, setShowPunchline] = useState<boolean>(false);

  useEffect(() => {
    if (!setup) {
      dispatch(getJoke());
    }
  }, [dispatch, setup]);

  useEffect(() => {
    if (joke && !setup) {
      setSetup(joke.setup);
      setPunchline(joke.punchline);
    }
  }, [joke, setup]);

  const handleShowPunchline = () => {
    setShowPunchline(true);
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div style={{ position: 'absolute', textAlign: 'center', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
      <h4>RANDOM JOKE</h4>
      {setup ? (
        <>
          <p>{setup}</p>
          <button 
            onClick={handleShowPunchline} 
            style={{ backgroundColor: '#96b0bc', padding: '10px', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer', marginBottom: '10px' }}
            disabled={showPunchline}
          >
            Show Punchline
          </button>
          {showPunchline && <p>{punchline}</p>}
          {showPunchline && (
            <button 
              onClick={handleRefreshPage} 
              style={{ backgroundColor: '#96b0bc', padding: '10px', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer', marginTop: '10px' }}
            >
              Refresh
            </button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
