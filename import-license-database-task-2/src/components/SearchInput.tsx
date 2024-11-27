import React, { useState } from 'react';

interface SearchInputProps {
    onSearchChange: (value: string) => void; // Define the type for the callback prop
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                className="field"
                style={{ marginBottom: '10px' }}
            />
        </div>
    );
};

export default SearchInput;
