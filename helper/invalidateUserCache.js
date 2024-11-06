module.exports = async (cache, id) => {
    const cachedDataString = await cache.get(`user:id:${id}`);
    const cachedData = cachedDataString ? JSON.parse(cachedDataString) : null;

    if (cachedData) {
        await cache.del(`user:id:${id}`)
        await cache.del(`user:accountNumber:${cachedData.accountNumber}`)
        await cache.del(`user:identityNumber:${cachedData.identityNumber}`)
    }
}