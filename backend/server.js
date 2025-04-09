const express = require('express');
const cors = require('cors');
const app = express();
const port = 3532;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

// Route registration
app.use('/api/peeps', require('./routes/peeps'));
app.use('/api/user_files', require('./routes/userFiles'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


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


// app.use(cors({
//   origin: 'http://localhost:4200', //frontend URL
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));
//
// // user stuff
// app.get('/api/peeps', async (req, res) => {
//   try {
//     // const result = await pool.query('SELECT * FROM peeps');
//     // res.json(result.rows);
//     const snapshot = await db.collection('peeps').get();
//     const peeps = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
//     res.json(peeps);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// app.post('/api/peeps', async (req, res) => {
//   try {
//     const {id, first_name, last_name, phone_nr, email, username, user_type} = req.body;
//
//     const newUser = {
//       id,
//       first_name,
//       last_name,
//       phone_nr,
//       email,
//       username,
//       // password,
//       user_type,
//       is_enabled: false,
//     };
//
//     //const docRef = await db.collection('peeps').add(newUser);
//     //res.json({ id: docRef.id, ...newUser });
//     const docRef = await db.collection('peeps').doc(email).set(newUser);
//     res.json({id: email, ...newUser});
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
//
// //TODO VERIFICA FUNCTIILE: DOCID SI ID STUFF
// app.get('/api/peeps/:id', async (req, res) => {
//   try {
//     const doc = await db.collection('peeps').doc(req.params.id).get();
//     if (!doc.exists) {
//       return res.status(404).json({message: 'User not found'});
//     }
//     res.json({id: doc.id, ...doc.data()});
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// app.put('/api/peeps/:id', async (req, res) => {
//   try {
//     const userRef = db.collection('peeps').doc(req.params.id);
//     await userRef.update(req.body);
//     res.json({message: 'User updated'});
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// app.delete('/api/peeps/:id', async (req, res) => {
//   try {
//     await db.collection('peeps').doc(req.params.id).delete();
//     res.json({message: 'User deleted'});
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// app.get('/api/user_files', async (req, res) => {
//   try {
//     // console.log('Fetching all user files...');
//     const snapshot = await db.collection('user_files').get();
//     const books = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
//     res.json(books);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// app.get('/api/user_files/:email', async (req, res) => {
//   try {
//     const userEmail = req.params.email;
//     // console.log('userEmail:', userEmail);
//     // const snapshot = await db.collection('user_files').where('userEmail', '==', userEmail).get();
//     const snapshot = await db
//       .collection('user_files')
//       .where('userEmail', '==', userEmail)
//       .get();
//
//     const user_files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
//     res.json(user_files);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
//
// //TODO: check FILES STUFF
//
// app.post('api/user_files', async (req, res) => {
//   //res.status(200).send("POST received  wiwiwi!");
//   try {
//     console.log('Received request body:', req.body);
//
//     const {userEmail, book_title, description, file_type, visibility, timestamp, storage_link} = req.body;
//
//     if (!userEmail || !book_title || !description || !file_type || !visibility || !timestamp || !storage_link) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
//
//     const newFile = {
//       userEmail,
//       book_title,
//       description,
//       file_type,
//       visibility,
//       timestamp,
//       storage_link
//     }
//
//     if (!userEmail) {
//       return res.status(400).json({ message: 'userEmail is required' });
//     }
//     const id = book_title + '_' + userEmail;
//     const docRef = await db.collection('user_files').doc(id).set(newFile);
//     res.json({id: id, ...newFile});
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
//
// // app.post('api/user_files',async (req, res)=>{
// //   console.log('Received request to add a new file');
// //   try {
// //     const { userEmail,
// //       book_title,
// //       description,
// //       file_type,
// //       visibility,
// //       timestamp,
// //       storage_link } = req.body;
// //
// //     const newFile = {
// //       userEmail,
// //       book_title,
// //       description,
// //       file_type,
// //       visibility,
// //       timestamp,
// //       storage_link
// //     };
// //
// //     const docId = book_title+'_'+userEmail;
// //     //const docRef = await db.collection('user_files').add(newFile);
// //     const docRef = await db.collection('user_files').doc(docId).set(newFile);
// //     res.json({ id: docId, ...newFile });
// //     console.log('File added:', newFile);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send('Server Error');
// //   }
// //
// // })
//
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
