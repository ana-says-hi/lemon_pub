const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/lemons-24438/firestore/databases/-default-/data/~2Fpeeps',
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
