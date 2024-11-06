module.exports = handler => async (req, res) => {
    try {
        const result = await handler(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};