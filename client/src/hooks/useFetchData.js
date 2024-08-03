import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setEntries } from '../store/dataSlice';

const useFetchData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        await axios.get('http://localhost:3000/fetch-data');
        console.log('Fetched data, now getting data from DB...');

        const response = await axios.get('http://localhost:3000/all-data');
        console.log('Data from DB:', response.data);
        dispatch(setEntries(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [dispatch]);

  return data || [];
};

export default useFetchData;
