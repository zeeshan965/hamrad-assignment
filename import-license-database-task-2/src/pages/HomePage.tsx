import React from 'react';
import Footer from "../components/Footer.tsx";
import SearchInput from "../components/SearchInput.tsx";
import DetailsTable from "../components/DetailsTable.tsx";
import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";
import useSearchRecord from "../hooks/useSearchRecord";

const HomePage: React.FC = () => {
    const {  setSearchValue, details, searchRecord } = useSearchRecord();

    const handleSearchChange = (value: string) => {
        setSearchValue(value);

    };

    return (
        <div
            className={'main-container '}
        >
            <div style={{ margin: '0px auto' }}>
                <Navbar />
                <Header />
                <div className="main-content">
                    {/* Render details */}
                    {details && (
                        <center>
                            <DetailsTable details={details} />
                        </center>
                    )}
                    <br />
                    <SearchInput onSearchChange={handleSearchChange} />
                    <div style={{ textAlign: 'center' }}>
                        <br />
                        <button className="btn btn-primary" onClick={searchRecord}>
                            Submit
                        </button>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
