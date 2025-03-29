import React, { useState, useEffect } from 'react';

const UpdateItem = ({ itemId }) => {
  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;
  const [item, setItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/${itemId}`);
        if (!response.ok) throw new Error('Failed to fetch item');
        const data = await response.json();
        setItem(data);
        setUpdatedItem(data.name);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchItem();
  }, [API_URI, itemId]);

  const handleChange = (e) => {
    setUpdatedItem(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URI}/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedItem }),
      });
      if (!response.ok) throw new Error('Failed to update item');
      const result = await response.json();
      setMessage('Item updated successfully!');
      setItem(result);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      {message && <p>{message}</p>}
      {item ? (
        <div>
          <p>Current Name: {item.name}</p>
          <input
            type="text"
            value={updatedItem}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
};

export default UpdateItem;
