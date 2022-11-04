const User = require(`../../models/user`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcrypt');


  async function create(req, res) {
   
    try{
      // Add the user to the database
      const user = await User.create(req.body);
      // Create JWT token
      const token = createJWT(user);
      // send token to client
      res.json(token);
    } catch (err){
      res.status(400).json(`Bad Credentials`)
    }
  }
  async function login(req, res) {
    //console.log(req.body)
    try{
      // Find the user in the database
      const user = await User.findOne({ email: req.body.email });
      
      if (!user) {
        return res.status(400).json({msg: 'Invalid email or password'})
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match){
        const token = createJWT(user)
        console.log(token);
        res.json( token);
      }
      } catch (err){
      res.status(400).json(`Bad Credentials`)
    }
  }

  function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }

  function createJWT(user){
    return jwt.sign(
      {user},
      process.env.SECRET,
      {expiresIn: `24h`}
    );
    
  }

  module.exports = {
    create,
    login,
    checkToken
  };
  