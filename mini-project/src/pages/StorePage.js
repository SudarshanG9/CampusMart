import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import axios from 'axios';

// REMOVE the mock 'items' array

const StorePage = () => {
  const [store, setStore] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const { storeId } = useParams(); // Get the storeId from the URL

  useEffect(() => {
    if (storeId) {
      axios.get(`http://localhost:5000/api/stores/${storeId}`)
        .then(response => {
          setStore(response.data.store);
          setItems(response.data.items);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.error('Error fetching store details!', error);
          setLoading(false);
        });
    }
  }, [storeId]); // This effect re-runs if the storeId changes

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        {store ? store.name : 'Store'} Inventory
      </h1>
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {items.length > 0 ? items.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <img src={item.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image'} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{item.name}</h3>
              <p style={{ margin: 0, color: '#555' }}>Quantity: {item.quantity}</p>
            </div>
          </div>
        )) : <p>This store has no items yet.</p>}
      </div>
    </div>
  );
};

export default StorePage;
