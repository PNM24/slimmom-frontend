import React from 'react';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from './redux/actions/loaderActions';
import Loader from './components/Loader/Loader';

function App() {
  const dispatch = useDispatch();

  const handleShowLoader = () => {
    dispatch(showLoader());
    setTimeout(() => {
      dispatch(hideLoader());
    }, 3000); // Ascunde loader-ul după 3 secunde
  };

  return (
    <div>
      <button onClick={handleShowLoader}>Show Loader</button>
      <Loader />
    </div>
  );
}

export default App;
