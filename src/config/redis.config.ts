import redis from 'redis-mock';

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

export const getCache = (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
};

export const setCache = (key: string, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export default client;
