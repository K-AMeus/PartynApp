import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Load the service account key from the environment variable
const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
});

const setAdmin = async (uid) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { admin: true });
        console.log(`User ${uid} has been made an admin`);
    } catch (error) {
        console.error('Error setting custom claims:', error);
    }
};

// Call the function with the admin UID from the environment variable
setAdmin(process.env.VITE_FIREBASE_ADMIN_UID);
