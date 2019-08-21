// https://stackoverflow.com/questions/23616371/basic-http-authentication-with-node-and-express-4

const express = require("express");
const app = express();

app.use((req, res) => {
  const auth = {
    login: "admin",
    password: "admin"
  };

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  const isValidCredentials = login && password &&
    login === auth.login &&
    password === auth.password;
  if (isValidCredentials) {
    // grant access
    return res.send("<marquee>Hello World</marquee>");
  }

  // deny access
  res.set('WWW-Authenticate', 'Basic realm="401"') // change this
  res.status(401).send('Authentication required.') // custom message
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${listener.address().port}`);
});