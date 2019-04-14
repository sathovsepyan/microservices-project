const redis = require('redis');
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype);


const client = redis.createClient(process.env.REDIS_URL);
const todayEnd = new Date().setHours(23, 59, 59, 999);

const redisClient = () => {
    const get = (key, callback) =>
        client.get(key, callback)

    const getAsync = key =>
        client.getAsync(key)

    const set = (key, value) => {
        client.set(key, value);
        client.expireat(key, parseInt(todayEnd / 1000));
    };

    return {
        get,
        getAsync,
        set
    }
}

module.exports = redisClient;