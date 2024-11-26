import React, { useState } from 'react';

const SearchInput = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value.trim());
    onSearchChange(value.trim());
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="AU, CA, CZ, DE, OR US CALLSIGN"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        className="field"
        style={{ marginBottom: '10px' }}
      />
    </div>
  );
};

export default SearchInput;
