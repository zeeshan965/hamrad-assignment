import {Timestamp} from "firebase/firestore";

export interface LogBookContact {
    id: string;
    timestamp: Timestamp;
}

export interface DayData {
    count: number;
    month: string;
}