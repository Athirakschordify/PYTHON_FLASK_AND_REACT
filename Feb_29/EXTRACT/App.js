import React, { useState } from 'react';
import './App.css'; // Import CSS file

function App() {
  const [url, setUrl] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/scrape-linkedin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, pageNumber }), // Sending both URL and number of pages
      });

      // Remove the response related code here

    } catch (error) {
      console.error('Error submitting data:', error);
      setMessage('Error submitting data. Please try again.');
    }
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handlePageNumberChange = (event) => {
    setPageNumber(event.target.value);
  };

  return (
    <div className="App">
      <h1>Fetch Data From Linkedin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <label>Pages:</label>
          <input
            type="number"
            value={pageNumber}
            onChange={handlePageNumberChange}
          />
        </div>
        <button type="submit">Submit</button>
        {/* Display the message received from the backend */}
        <p>{message}</p>
      </form>
    </div>
  );
}

export default App;
