const { db } = require('../config/firebase');

exports.getAllPeeps = async (req, res) => {
  try {
    const snapshot = await db.collection('peeps').get();
    const peeps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(peeps);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createPeep = async (req, res) => {
  try {
    const { email, ...data } = req.body;
    const newUser = { ...data, id: email, is_enabled: false };
    await db.collection('peeps').doc(email).set(newUser);
    res.json({ id: email, ...newUser });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getPeepByEmail= async (req, res) => {
  try {
    console.log('getPeepByEmail called');
    const email = req.params.email;
    const doc = await db.collection('peeps')
      .where('email', '==', email)
      // .limit(1)
      .get();
    // console.log('Query executed');
    // console.log('Number of documents found:', doc.docs.length);
    if (doc.docs.length===0) return res.status(404).json({ message: 'User not found' });
    const doc1 = doc.docs[0];
    res.json({ id: doc1.id, ...doc1.data() });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updatePeep = async (req, res) => {
  try {
    await db.collection('peeps').doc(req.params.id).update(req.body);
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deletePeep = async (req, res) => {
  try {
    await db.collection('peeps').doc(req.params.id).delete();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
