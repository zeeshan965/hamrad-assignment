import admin from "firebase-admin";
import mysql from "mysql2/promise";
import fs from "fs";
import serviceAccount from "./src/config/contactsperday-firebase-adminsdk-jqa9i-4bd9901656.json" assert { type: "json" };

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// File to track progress
const PROGRESS_FILE = "./import_progress.json";

// Constants
const BATCH_SIZE = 250; // Firestore batch size
const MAX_WRITES_PER_DAY = 1000; // Free tier daily write limit

// Load progress from file
const loadProgress = () => {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
  }
  return { offset: 0, writesToday: 0 };
};

// Save progress to file
const saveProgress = (progress) => {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
};

// Connect to MySQL
const connectToDatabase = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "fcc_amateur",
  });
};

// Fetch data from MySQL with limit and offset
const fetchData = async (connection, limit, offset) => {
  console.log(`Fetching data with LIMIT: ${limit}, OFFSET: ${offset}`); // Debug log
  if (typeof limit !== "number" || typeof offset !== "number") {
    throw new Error("LIMIT and OFFSET must be numbers");
  }
  const [rows] = await connection.execute(
      `
        SELECT am.fccid, am.callsign, am.class, am.former_call, am.former_class,
               en.full_name, en.first, en.middle, en.last, en.address1, en.city, en.state, en.zip,
               hd.status
        FROM am
               LEFT JOIN en ON am.fccid = en.fccid
               LEFT JOIN hd ON am.fccid = hd.fccid
          LIMIT ${limit} OFFSET ${offset}
      `,
  );
  return rows;
};

// Transform rows to Firestore format
const transformData = (rows) =>
    rows.map((row) => ({
      callsign: row.callsign || null,
      fccid: row.fccid || null,
      class: row.class || null,
      former_call: row.former_call || null,
      former_class: row.former_class || null,
      full_name: row.full_name || null,
      first: row.first || null,
      middle: row.middle || null,
      last: row.last || null,
      address: {
        line1: row.address1 || null,
        city: row.city || null,
        state: row.state || null,
        zip: row.zip || null,
      },
      status: row.status || null,
    }));

// Import data into Firestore
const importToFirestore = async (data) => {
  const batch = db.batch();
  data.forEach((record) => {
    const docRef = db.collection("operators").doc(record.callsign);
    batch.set(docRef, record, { merge: true });
  });
  await batch.commit();
};

// Main function to handle the import process
const run = async () => {
  try {
    const connection = await connectToDatabase();
    console.log("Connected to MySQL");

    const progress = loadProgress();
    console.log(`Resuming from offset: ${progress.offset}`);
    console.log(`Writes today so far: ${progress.writesToday}`);

    while (progress.writesToday <= MAX_WRITES_PER_DAY) {
      // Fetch data in chunks
      const rows = await fetchData(connection, BATCH_SIZE, progress.offset);
      if (rows.length === 0) {
        console.log("All data imported into Firestore!");
        break;
      }

      const transformedData = transformData(rows);

      // Import to Firestore
      await importToFirestore(transformedData);
      console.log(`Imported ${rows.length} records from offset ${progress.offset}`);

      // Update progress
      progress.offset += rows.length;
      progress.writesToday += rows.length;
      saveProgress(progress);

      // Stop when daily write limit is reached
      if (progress.writesToday >= MAX_WRITES_PER_DAY) {
        console.log(`Reached daily write limit of ${MAX_WRITES_PER_DAY}. Resuming tomorrow.`);
        break;
      }
    }

    console.log("Data import complete for today.");
  } catch (error) {
    console.error("Error during import:", error);
  }
};

run();
