// Récupération des modules de création de serveurs
const http = require('http');
const https = require('https');

// Récupération des valeurs de variables d'environnement
const { ports, ssl: { cert, key } } = require(`../env/env.${process.env.NODE_ENV}`);
const app = require('../app');

// Création du serveur HTTP
http
  .createServer((req, res) => {
    // Déclaration de l'url de redirection
    // à partir de la requête
    const redirectUrl = `https://${req.headers.host.split(':')[0]}:${ports.https}${req.url}`;
    
    // res.setHeader('Location', redirectUrl);
    // res.statusCode = 301;
    res.writeHead(301, { Location: redirectUrl });
    res.end();
  })
  .listen(ports.http);

// Création du serveur HTTPS
https
  .createServer({ cert, key }, app)
  .listen(ports.https);