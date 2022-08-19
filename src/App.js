import React, { Suspense } from 'react';
import './App.css';
import Loading from './loading';
import Star from './stars';
import Navbar from './navbar';
function App({page}) {
  const Luna = React.lazy(() => import('./luna'));
  const Mural = React.lazy(() => import('./mural'));
  const Score = React.lazy(() => import('./score'));

  return (
    <>
      <div className="App">
      <Navbar/>
      <Suspense fallback={<Loading />}>
        {page === 'home' && <Luna />}
        {page === 'mural' && <Mural />}
        {page === 'score' && <Score />}
      </Suspense>
      <Star />
      </div>
    </>
  );
}

export default App;
