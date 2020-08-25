// /api/auth/logout '/logout'
//-----------------------------//------------
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(password, rounds);

  Users.add({ username, password: hash, email })
    .then((user) => {
      const token = createToken(user);
      res.status(201).json({ data: user, token });
    })
    .catch((err) => res.json({ error: err.message }));
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then((users) => {
      const user = users[0];

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);

        // req.session.loggedIn = true;

        res.status(200).json({
          message: `Welcome ${user.username}! You logged in!`,
          data:user,
          token,
        });
      } else {
        res.status(401).json({ error: "you cannot pass!" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

//---Token----//
function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET || "keep it secret, keep it safe";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
