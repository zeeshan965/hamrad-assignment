import React, { useState } from 'react';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      window.location.href = `http://hamdb.org/${searchValue}`;
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="AU, CA, CZ, DE, OR US CALLSIGN"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        className="field"
        style={{ marginBottom: '10px' }}
      />
      <br />
      <button className="btn btn-primary" onClick={handleSearch}>Submit</button>
    </div>
  );
};

export default SearchInput;
