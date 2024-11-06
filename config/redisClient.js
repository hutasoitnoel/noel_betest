const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379'
});

client.on('error', error => console.error('Redis error:', error));

client.connect();

module.exports = client;
