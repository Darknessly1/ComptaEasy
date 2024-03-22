import React, { useState, useEffect } from 'react';
import data from './JSON_Kontenplan_Vorlage.json';

const SearchBarFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSentences, setFilteredSentences] = useState([]);

  const getLevelColor = (level) => {
    const colors = [
      'text-blue-800',
      'text-green-600',
      'text-purple-600',
      'text-orange-600',
      'text-cyan-600',
      'text-red-600',
      
    ];

    const index = (level - 1) % colors.length;
    return colors[index];
  };

  const extractSentences = (items, parentLevel = '') => {
    const sentences = [];

    const extract = (item) => {
      const level = parentLevel ? `${parentLevel}.${item.level}` : item.level;
      if (item.descriptions && item.descriptions.en) {
        sentences.push({ text: item.descriptions.en, level });
      }

      if (item.childrens && item.childrens.length > 0) {
        item.childrens.forEach((childItem) => extract(childItem, level));
      }
    };

    items.forEach((item) => extract(item));
    return sentences;
  };

  const allSentences = extractSentences(data.root.childrens);

  useEffect(() => {
    setFilteredSentences(allSentences);
  }, [allSentences]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (searchTerm) => {
    const filteredSentences = allSentences.filter((sentence) =>
      sentence.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredSentences(filteredSentences);
  };

  return (
    <div className="h-screen m-4 flex items-center justify-center flex-col min-h-screen bg-gray-900/50">
      <div className="w-72">
        <div className="relative w-full min-w-[200px] h-10">
          <input
            type="text"
            className="peer w-full h-full bg-transparent text-white font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-white-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-white-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder=""
            onChange={handleInputChange}
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-white leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Username
          </label>
        </div>
      </div>



      <div className="relative w-fit m-5 flex flex-col mt-6 p-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl" style={{ overflowY: 'auto', maxHeight: '400px' }}>
        <ul>
          {filteredSentences.map((sentence, index) => (
            <li key={index} className="mb-2">
              <strong className={getLevelColor(sentence.level)}>{sentence.text}</strong>
              <span className="text-gray-500 text-sm ml-2">(Level: {sentence.level})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBarFilter;
