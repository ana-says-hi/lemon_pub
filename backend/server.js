const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

//const { Pool } = require('pg');

const app = express();
const port = 3532;

app.use(cors());
app.use(express.json());

// const auth = getAuth(app);


// Load service account credentials
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/lemons-24438/firestore/databases/-default-/data/~2Fpeeps',
});

const db = admin.firestore(); // Firestore
const auth = admin.auth(); // Firebase Authentication

// const authenticateUser = async (req, res, next) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];
//
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }
//
//   try {
//     const decodedToken = await auth.verifyIdToken(token);
//     req.user = decodedToken;
//     next(); // Proceed to the next middleware
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };


app.use(cors({
  origin: 'http://localhost:4200', //frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// user stuff
app.get('/api/peeps', async (req, res) => {
  try {
    // const result = await pool.query('SELECT * FROM peeps');
    // res.json(result.rows);
    const snapshot = await db.collection('peeps').get();
    const peeps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(peeps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/peeps', async (req, res) => {
  try {
    const { id, first_name, last_name, phone_nr, email, username, user_type } = req.body;

    const newUser = {
      id,
      first_name,
      last_name,
      phone_nr,
      email,
      username,
     // password,
      user_type,
      is_enabled: false,
    };

    //const docRef = await db.collection('peeps').add(newUser);
    //res.json({ id: docRef.id, ...newUser });
    const docRef = await db.collection('peeps').doc(email).set(newUser);
    res.json({ id: email, ...newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//TODO VERIFICA FUNCTIILE: DOCID SI ID STUFF
app.get('/api/peeps/:id', async (req, res) => {
  try {
    const doc = await db.collection('peeps').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/api/peeps/:id', async (req, res) => {
  try {
    const userRef = db.collection('peeps').doc(req.params.id);
    await userRef.update(req.body);
    res.json({ message: 'User updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.delete('/api/peeps/:id', async (req, res) => {
  try {
    await db.collection('peeps').doc(req.params.id).delete();
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//files stuff
//TODO: check FILES STUFF
app.get('/api/user_files', async (req, res) => {
  try {
    const snapshot = await db.collection('files').get();
    const files = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('api/user_files',async (req, res)=>{

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
