const { db } = require('../config/firebase');

exports.getAllFiles = async (req, res) => {
  try {
    const snapshot = await db.collection('user_files').get();
    const files = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getFilesByEmail = async (req, res) => {
  try {
    const snapshot = await db.collection('user_files').where('userEmail', '==', req.params.email).get();
    const files = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createFile = async (req, res) => {
  console.log('TRYING TO CREATE FILE');
  try {
    console.log('Creating new file with data:', req.body);
    console.log('Creating new file with data:', req.data);
    console.log('Creating new file with data:', req.toString());
    console.log('Creating new file with data:', req.params);
    const { userEmail, book_title, description, file_type, visibility, timestamp, storage_link } = req.body;

    if (!userEmail || !book_title || !description || !file_type || !visibility || !timestamp || !storage_link) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const id = `${book_title}_${userEmail}`;
    const newFile = { userEmail, book_title, description, file_type, visibility, timestamp, storage_link };
    await db.collection('user_files').doc(id).set(newFile);
    res.json({ id, ...newFile });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
