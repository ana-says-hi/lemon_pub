const {db} = require('../config/firebase');

exports.getAllOffers = async (req, res) => {
  try {
    const snapshot = await db.collection('offers').get();
    const files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getOfferByUser = async(req, res)=>{
  try {
    const snapshot = await db.collection('offers')
      .where('agent', '==', req.params.email ||'writer', '==', req.params.email).get();
    const files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

exports.createOffer  = async (req, res) => {
  try {
    const {agent, autor, book_id, expiration_date, offer, timestamp, active, accepted} = req.body;
    // if (!userEmail || !book_title || !description || !file_type || !visibility || !timestamp || !storage_link) {
    //   return res.status(400).json({ message: 'All fields are required' });
    // }
    const id = `${agent}_${timestamp}`;
    const newOffer = {agent, autor, book_id, expiration_date, offer, timestamp, active, accepted};
    await db.collection('offers').doc(id).set(newOffer);
    res.json({id, ...newOffer});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateOffer = async (req, res) => {
  try {
    await db.collection('offers').doc(req.params.id).update(req.body);
    res.json({ message: 'Offer updated' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
