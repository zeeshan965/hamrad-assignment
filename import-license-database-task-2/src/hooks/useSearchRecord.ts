import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
interface Address {
    city: string;
    line1: string;
    state: string;
    zip: string;
}

export interface Details {
    address: Address; // Optional address object
    callsign?: string;
    class?: string;
    fccid?: number;
    first?: string;
    former_call?: string | null;
    former_class?: string | null;
    full_name?: string;
    last?: string;
    middle?: string;
    status?: string;
    grid?: string; // Optional
    expires?: string; // Optional
    fccUrl?: string;
    xmlUrl?: string;
    jsonUrl?: string;
    csvUrl?: string;
}


const useSearchRecord = () => {
    const [searchValue, setSearchValue] = useState('');
    const [details, setDetails] = useState<Details | null>(null);

    const searchRecord = async () => {
        if (!searchValue.trim()) {
            alert('Please enter a search value.');
            return;
        }

        try {
            const q = query(
                collection(db, 'operators'),
                where('callsign', '==', searchValue)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const values = doc.data() as Details;
                    setDetails(values); // Update state with fetched details
                });
            } else {
                alert('No record found.');
                setDetails(null); // Clear details if no record found
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again later.');
        }
    };

    return { searchValue, setSearchValue, details, searchRecord };
};

export default useSearchRecord;
