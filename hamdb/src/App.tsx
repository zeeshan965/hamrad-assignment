import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import DetailsTable from './components/DetailsTable';
import SearchInput from './components/SearchInput';
import Footer from './components/Footer';

const App: React.FC = () => {

  const [searchValue, setSearchValue] = useState('');

  const [clearSearch, setClearSearch] = useState(false);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    console.log('Search value updated in parent:', value); // For debugging
  };


  // Mock Data for Details
  const details = {
    // name: 'James R Cribbs Jr',
    // callsign: 'KN4NEH',
    // class: 'Amateur Extra',
    // status: 'Active',
    // grid: 'EM73uw',
    // expires: '06/15/2028',
    // address: '2983 Sumac Dr, Atlanta, GA 30360, United States',
    // fccUrl: 'http://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=4056805',
    // xmlUrl: 'https://hamdb.org/KN4NEH/xml',
    // jsonUrl: 'https://hamdb.org/KN4NEH/json',
    // csvUrl: 'https://hamdb.org/KN4NEH/csv',
  };

  return (
    <div style={{ margin: '0px auto' }}>
      <Navbar />
      <Header />
      <div className="main-content">
        {details.length > 0 && (
            <center>
              <DetailsTable details={details} />
            </center>
          )}
        <br /> 
        <SearchInput onSearchChange={handleSearchChange} />
        <div style={{ textAlign: 'center' }}>
          <br />
          <button className="btn btn-primary" onClick={''}>Submit</button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
