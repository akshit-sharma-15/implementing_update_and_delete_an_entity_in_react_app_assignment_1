import React, { useState, useEffect } from 'react';
import UpdateItem from './components/UpdateItem';

// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/1`); // Example for door with id 1
        if (!response.ok) throw new Error('Failed to fetch item');
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, []);

  return item ? <UpdateItem itemId={item.id} /> : <p>Loading item...</p>;
}

export default App;
