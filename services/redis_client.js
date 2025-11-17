const { createClient } = require('redis');

require('dotenv').config();

const redisUrl = process.env.REDIS_URL;
const client = createClient({ url: redisUrl });

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

async function connectRedis() {
  if (!client.isOpen) {
    console.log('Connecting to Redis...');
    await client.connect();
  }
}

module.exports = { client, connectRedis };
