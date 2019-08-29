'use strict';

module.exports = (fn) => async (req, res, next) => {
    try {
        await fn.validate(req.body, { abortEarly: false });

        return next();
    } catch (err) {
        return res.status(400).json({ mensagens: err.errors });
    }
};