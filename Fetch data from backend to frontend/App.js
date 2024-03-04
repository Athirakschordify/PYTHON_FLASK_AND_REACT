import React, { useState, useEffect } from 'react';

function App() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.text();
      setBackendMessage(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Message from Flask Backend:</h1>
      <p>{backendMessage}</p>
    </div>
  );
}

export default App;
