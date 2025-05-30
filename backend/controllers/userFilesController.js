const {db} = require('../config/firebase');

exports.getAllFiles = async (req, res) => {
  try {
    const snapshot = await db.collection('user_files').get();
    const files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getFilesByEmail = async (req, res) => {
  try {
    const snapshot = await db.collection('user_files').where('userEmail', '==', req.params.email).get();
    const files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createFile = async (req, res) => {
  try {
    const {userEmail, book_title, description, file_type, visibility, timestamp, storage_link} = req.body;
    // if (!userEmail || !book_title || !description || !file_type || !visibility || !timestamp || !storage_link) {
    //   return res.status(400).json({ message: 'All fields are required' });
    // }
    const id = `${book_title}_${userEmail}`;
    const newFile = {userEmail, book_title, description, file_type, visibility, timestamp, storage_link};
    await db.collection('user_files').doc(id).set(newFile);
    res.json({id, ...newFile});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateFile = async (req, res) => {
  try {
    const {userEmail, book_title, description, file_type, visibility, timestamp, storage_link, genres} = req.body;
    const id = `${book_title}_${userEmail}`;

    const updatedFile = {userEmail, book_title, description, file_type, visibility, timestamp, storage_link, genres};
    await db.collection('user_files').doc(id).set(updatedFile);
    res.json({id, ...updatedFile});
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

exports.updateFileGenres = async (req, res) => {
  try {
    const {genres} = req.params;
    const id = req.params.id;

    // Fetch the existing file
    const fileDoc = await db.collection('user_files').doc(id).get();
    if (!fileDoc.exists) {
      return res.status(404).send('File not found');
    }

    // Update the genres field
    await db.collection('user_files').doc(id).update({genres: genres.split(',')});

    res.json({id, genres: genres.split(',')});
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

