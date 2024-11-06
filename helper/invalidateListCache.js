module.exports = async cache => {
    const keys = await cache.keys('users:page:*');
    for (const key of keys) {
        await cache.del(key);
    }
}