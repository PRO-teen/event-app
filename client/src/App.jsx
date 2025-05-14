import { useEffect, useState } from 'react';
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
      <h1>Frontend-app eventapp</h1>
      <p>Backend says: {ping}</p>
    </div>
  );
}

export default App;
