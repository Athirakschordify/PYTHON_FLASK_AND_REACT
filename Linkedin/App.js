import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/fetch-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const responseData = await response.json();
      if (response.ok) {
        setMessage(responseData.message); // Update the message state with the value received from the backend
        setUrl(responseData.url);
      } else {
        setMessage(responseData.error);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setMessage('Error submitting data. Please try again.');
    }
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="App">
      <h1>Fetch Data from Backend:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        {/* Display the message received from the backend */}
        {/* <p>{message}{url}</p> */}
      </form>
    </div>
  );
}

export default App;
