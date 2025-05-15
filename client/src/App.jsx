import { useEffect, useState } from 'react';
import './index.css'
import axios from 'axios';

function App() {
  const [ping, setPing] = useState('');

  useEffect(() => {
    axios.get('https://event-backend-zgcz.onrender.com/api/ping')
      .then(res => setPing(res.data.message))
      .catch(() => setPing('Error connecting to backend'));
  }, []);

  return (
    <div>
      <h1 className='bg-red-300'>this is Frontend</h1>
      <p>Backend says: {ping}</p>
    </div>
  );
}

export default App;








