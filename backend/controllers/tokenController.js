const { db } = require('../config/firebase');
const { StreamChat } = require('stream-chat');
const {getPeepByEmail, updatePeep, findPeepByEmail, updateP} = require("./peepsController");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const serverClient = StreamChat.getInstance(apiKey, apiSecret);


exports.getUserToken = async (req, res) => {
  const email = req.params.email;
  if (!email) return res.status(400).json({ error: 'Missing userId' });

  const user = await findPeepByEmail(email)

  const safeUserId = email.replace(/[.@]/g, '_');
  await serverClient.upsertUser({
    id: safeUserId,
    name: user.username,
  });

  if(user.token!=null && user.token != '') {
    console.log("token1: " + user.token);
    return res.json({token: user.token});
  }

  try {
    const token = serverClient.createToken(safeUserId);
    user.token = token;
    // console.log("token2: " + token);
    updateP(user);
    // console.log("token2: " + token);
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate token' });
  }
};
