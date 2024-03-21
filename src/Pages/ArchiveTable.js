import React, { useState } from 'react';

const ArchivedTable = () => {
  // Sample archived tables data
  const [archivedTables] = useState([
    { id: 1, name: 'Cozy Corner', archived: true, imageUrl: 'https://via.placeholder.com/400x200?text=Cozy+Corner' },
    { id: 2, name: 'Elegant Dining', archived: true, imageUrl: 'https://via.placeholder.com/400x200?text=Elegant+Dining' },
    { id: 3, name: 'Rustic Retreat', archived: true, imageUrl: 'https://via.placeholder.com/400x200?text=Rustic+Retreat' },
    { id: 4, name: 'Sunny Terrace', archived: true, imageUrl: 'https://via.placeholder.com/400x200?text=Sunny+Terrace' },
    { id: 5, name: 'Sunny Terrace', archived: true, imageUrl: 'https://via.placeholder.com/400x200?text=Sunny+Terrace' },
  ]);

  // Function to handle navigation to the selected table
  const navigateToTable = (tableId) => {
    // Assuming you have a function to handle navigation
    // Here, we're just logging the selected table id
    console.log('Navigating to Table', tableId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Archived Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {archivedTables.map(table => (
          <div key={table.id} className="bg-gray-200 rounded-lg overflow-hidden shadow-md relative">
            <img src={table.imageUrl} alt={table.name} className="w-full h-auto blur-lg" />
            <div className="p-4 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-white text-lg font-bold">{table.name}</p>
            </div>
            <button onClick={() => navigateToTable(table.id)} className="absolute bottom-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Go to Table</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedTable;
