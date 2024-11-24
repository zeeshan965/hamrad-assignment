import admin from "firebase-admin";
import mysql from "mysql2/promise";
import serviceAccount from "./src/config/contactsperday-firebase-adminsdk-jqa9i-4bd9901656.json" assert { type: "json" };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const connectToDatabase = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "fcc_amateur",
  });
};

const fetchData = async (connection) => {
  const [rows] = await connection.execute(`
    SELECT am.fccid, am.callsign, am.class, am.former_call, am.former_class,
           en.full_name, en.address1, en.city, en.state, en.zip,
           hd.status
    FROM am
    LEFT JOIN en ON am.fccid = en.fccid
    LEFT JOIN hd ON am.fccid = hd.fccid
  `);
  return rows;
};

const transformData = (rows) => {
    return rows.map(row => ({
      callsign: row.callsign || null,
      fccid: row.fccid || null,
      class: row.class || null,
      former_call: row.former_call || null,
      former_class: row.former_class || null,
      full_name: row.full_name || null,
      address: {
        line1: row.address?.line1 || null,
        city: row.address?.city || null,
        state: row.address?.state || null,
        zip: row.address?.zip || null,
      },
      status: row.status || null,
    }));
  };

const importToFirestore = async (data) => {
  const chunkSize = 500;
  for (let i = 0; i < data.length; i += chunkSize) {
    const batch = db.batch();
    const chunk = data.slice(i, i + chunkSize);

    chunk.forEach(record => {
      const docRef = db.collection("operators").doc(record.callsign);
      batch.set(docRef, record);
    });

    await batch.commit();
    console.log(`Batch ${Math.floor(i / chunkSize) + 1} committed`);
  }
};

const run = async () => {
  try {
    // const connection = await connectToDatabase();
    // console.log("Connected to MySQL");

    // const [rows] = await connection.execute(`SELECT * FROM am`);
    // console.log("Fetched rows:", rows);
    
    const transformedData = transformData([{
        callsign: "KN4NEH",
        fccid: 12345,
        class: "A",
        former_call: "AB1CD",
        former_class: "B",
        full_name: "John Doe",
        address: {
          line1: "123 Elm St",
          city: "Springfield",
          state: "IL",
          zip: "62701",
        },
        status: "Active",
      }]);
    console.log("Data transformed for Firestore");

    await importToFirestore(transformedData);
    console.log("Data imported into Firestore");
  } catch (error) {
    console.error("Error during import:", error);
  }
};

run();
