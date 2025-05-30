const {db} = require('../config/firebase');

exports.getAllBids = async (req, res) => {
  try {
    const snapshot = await db.collection('bids').get();
    const files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getBidByUser = async(req,res)=>{
  try {
    const snapshot = await db.collection('bids').where('agent', '==', req.params.email ||'writer', '==', req.params.email).get();
    const files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

exports.createBid  = async (req, res) => {
  try {
    const {agent, autor, book_id, expiration_date, offer, timestamp, active, accepted} = req.body;
    // if (!userEmail || !book_title || !description || !file_type || !visibility || !timestamp || !storage_link) {
    //   return res.status(400).json({ message: 'All fields are required' });
    // }
    const id = `${agent}_${timestamp}`;
    const newBid = {agent, autor, book_id, expiration_date, offer, timestamp, active, accepted};
    await db.collection('bids').doc(id).set(newBid);
    res.json({id, ...newBid});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
