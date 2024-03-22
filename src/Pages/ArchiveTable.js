import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArchivedTables = () => {
  const [archivedTableNames, setArchivedTableNames] = useState([]);

  useEffect(() => {
    fetchArchivedTables();
  }, []);

  const fetchArchivedTables = async () => {
    try {
      const response = await axios.get('http://localhost:8081/archived-tables'); // Update the URL if necessary
      setArchivedTableNames(response.data.archivedTableNames);
    } catch (error) {
      console.error('Error fetching archived tables:', error);
    }
  };
  

  return (
    <div>
      <h1 className='text-black'>Archived Tables</h1>
      <ul>
        {archivedTableNames.map((tableName, index) => (
          <li key={index} className='text-black'>{tableName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivedTables;
