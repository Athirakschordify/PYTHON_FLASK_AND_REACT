import React, { useState } from 'react';
import './App.css'; // Import CSS file

function App() {
  const [url, setUrl] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handlePageNumberChange = (event) => {
    setPageNumber(event.target.value);
  };

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

      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'linkedin_data.xlsx'; // Fix the download attribute value
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setMessage('File downloaded successfully!');
      } else {
        setMessage('Error downloading file.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      setMessage('Error downloading file. Please try again.');
    }
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
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
