const redis = require('redis');
const client = redis.createClient();

client.on('error', error => console.error('Redis error:', error));

client.connect();

module.exports = client;
