module.exports = async (cache, user) => {
    await cache.set(`user:id:${user._id}`, JSON.stringify(user), { EX: 3600 })
    await cache.set(`user:accountNumber:${user.accountNumber}`, String(user._id), { EX: 3600 })
    await cache.set(`user:identityNumber:${user.identityNumber}`, String(user._id), { EX: 3600 })
}