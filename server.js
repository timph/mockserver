const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()
// server.use(middlewares)

const PORT = process.env.PORT || 4000;

const ImageKit = require("imagekit");
const fs = require('fs');
const { IMK_PUBLIC_KEY, IMK_PRIVATE_KEY, IMK_ENDPOINT } = require('./env');

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
});

server.get('/image-auth', (req, res) => {
  res.set({
    "Access-Control-Allow-Origin" : "*"
  });
  const imagekit = new ImageKit({
    publicKey : IMK_PUBLIC_KEY,
    privateKey : IMK_PRIVATE_KEY,
    urlEndpoint : IMK_ENDPOINT,
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();
  console.log(authenticationParameters);
  res.json(authenticationParameters);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})
