import {useState, useEffect} from "react";
import {collection, getDocs, query, Timestamp, orderBy, where, QuerySnapshot, DocumentData} from "firebase/firestore";
import {db} from "../config/firebase";
import {LineChartResponse} from "../utils/LineChartResponse.dto.ts";
import {DayData, LogBookContact} from "../utils/LogBookContact.interface.ts";

export const useNumberOfContactsPerDayChart = (year: number): LineChartResponse => {
    const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(7); // Default to week 7
    const [currentMonth, setCurrentMonth] = useState<string>("February");
    const [categoriesLabels, setCategoryLabels] = useState<string[]>([]);
    const [graphWeeklyData, setGraphWeeklyData] = useState<Record<number, number[]>>({});

    const currentWeek = graphWeeklyData[currentWeekIndex] || [];

    const previousWeek = () => {
        if (currentWeekIndex > 1) {
            setCurrentWeekIndex((prev) => prev - 1);
        }
    };

    const nextWeek = () => {
        if (currentWeekIndex < 52) {
            setCurrentWeekIndex((prev) => prev + 1);
        }
    };

    const getWeekDateRange = (year: number, weekNumber: number) => {
        const firstDayOfYear = new Date(year, 0, 1);
        const daysOffset = (weekNumber - 1) * 7;
        const startDate = new Date(firstDayOfYear.getTime() + daysOffset * 24 * 60 * 60 * 1000);

        // Adjust start date to the beginning of the week (Monday)
        const dayOfWeek = startDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
        const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday
        const weekStart = new Date(startDate.setDate(diff));

        // End date is 7 days after the start
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return {start: weekStart, end: weekEnd};
    };

    const fetchLogbookContact = async () => {
        try {
            const {start, end} = getWeekDateRange(year, currentWeekIndex);

            const logbookCollection = collection(db, "LogBookContact");

            // Firestore requires Timestamp objects for queries
            const startTimestamp = Timestamp.fromDate(start);
            const endTimestamp = Timestamp.fromDate(end);

            const q = query(
                logbookCollection,
                where("timestamp", ">=", startTimestamp),
                where("timestamp", "<=", endTimestamp),
                orderBy("timestamp")
            );

            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
            const contacts: LogBookContact[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
            }));

            // Group by day and count
            const groupedByDay = contacts.reduce((acc: Record<string, DayData>, contact) => {
                const dateObj = contact.timestamp.toDate(); // Firestore timestamp to Date
                const date = dateObj.toISOString().split("T")[0]; // Format as YYYY-MM-DD
                const month = new Intl.DateTimeFormat("en-US", {month: "long", timeZone: "UTC"}).format(dateObj);

                // Group and count by day
                if (!acc[date]) {
                    acc[date] = {count: 0, month};
                }
                acc[date].count += 1;

                return acc;
            }, {});

            // Prepare categories
            const categories = Object.keys(groupedByDay).map((date) =>
                new Date(date).toLocaleDateString("en-US", {month: "2-digit", day: "2-digit"})
            );
            setCategoryLabels(categories);

            // Extract unique months
            const uniqueMonths = Array.from(new Set(Object.values(groupedByDay).map((day) => day.month)));
            setCurrentMonth(uniqueMonths.join(" | "));

            // Update graphWeeklyData dynamically
            const weeklyData = Object.values(groupedByDay).map((day) => day.count); // Extract counts
            setGraphWeeklyData((prev) => ({
                ...prev,
                [currentWeekIndex]: weeklyData, // Update data for the current week
            }));
        } catch (error) {
            console.error("Error fetching LogBookContact data:", error);
        }
    };

    useEffect(() => {
        fetchLogbookContact();
    }, [currentWeekIndex]);

    return {
        currentWeekIndex,
        currentMonth,
        categoriesLabels,
        currentWeek,
        previousWeek,
        nextWeek,
    };
};