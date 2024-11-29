import { useState } from 'react';
// import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', query);
        // Add your search logic here
    };

    return (
        <div className="search-bar flex">
            <input
                className="p-4 my-2 text-2xl border border-gray-500 rounded-xl"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button className='mt-2' onClick={handleSearch}>
                <img className='p-4' src="/public/search.png" alt="Search" />
            </button>
        </div>
    );
};

export default SearchBar;
