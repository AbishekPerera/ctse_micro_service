function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization required' });
    }

    const token = authHeader.split(' ')[1];

    if (token !== process.env.AUTH_TOKEN) {
        return res
            .status(401)
            .json({ message: 'Invalid authentication token' });
    }

    next();
}

export default authMiddleware;
