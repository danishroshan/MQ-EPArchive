import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[90%] bg-white p-2 rounded-2xl border border-gray-300">
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full pl-4 pr-16 py-3.5 rounded-xl text-gray-700 bg-gray-50 border-0 outline-none transition-all duration-300"
            value={value}
            onChange={onChange}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-red-400 rounded-full hover:bg-green-600 transition-colors">
            <Search className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;