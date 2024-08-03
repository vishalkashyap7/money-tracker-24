import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import useFetchData from './hooks/useFetchData';
import Table from './components/Table';
import Footer from './components/Footer';

const App = () => {
  const data = useFetchData();
  // console.log('Redux Data:', data);

  return (
    <Provider store={store}>
      <div>
        <h1>Top 5 Coins Data:</h1>
        {Array.isArray(data) && data.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <Table data={data} />
        )}
      </div>
      <Footer>
      </Footer>
    </Provider>
  );
};

export default App;
