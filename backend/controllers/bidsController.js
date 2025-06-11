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

exports.getBidsByUser = async(req, res)=>{
  try {
    const snapshot = await db.collection('bids')
      .where('writer', '==', req.params.email).get();
    const files = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json(files);
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

exports.createBid  = async (req, res) => {
  try {
    const { user_email, book_title, min_value, offers } = req.body;
    // if (!user_email || !book_title || !min_value || !offers) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }
    const timestamp = Date.now();
    const docId = `${user_email}_${timestamp}`;
    const bidData = {
      active: true,
      user_email,
      book_title,
      min_value,
      offers,
    };
    await db.collection("bids").doc(docId).set(bidData);
    // return res.status(201).json({ message: "Bid created", id: docId });
    res.json({docId, ...bidData});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateBid = async (req, res) => {
  try {
    await db.collection('bids').doc(req.params.id).update(req.body);
    res.json({ message: 'Bid updated' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
