const ScholarUser = require("../models/ScholarUser");

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await ScholarUser.login(email, password);
        
        // Set session data
        req.session.user = {
            email: user.email,
            username: user.username
        };
        
        // Save session before sending response
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Error saving session" });
            }
            res.status(200).json({
                message: "Login successful",
                user: {
                    email: user.email,
                    username: user.username
                }
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(401).json({ 
            message: error.message || "Authentication failed"
        });
    }
};

exports.logout = async (req, res, next) => {
    try {
        // Clear session from store
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error("Session destruction error:", err);
                    return res.status(500).json({ message: "Error during logout" });
                }
                // Clear the session cookie
                res.clearCookie('connect.sid', {
                    path: '/',
                    httpOnly: true,
                    secure: false, // Set to true if using HTTPS
                    sameSite: 'lax'
                });
                res.status(200).json({ message: "Logged out successfully" });
            });
        } else {
            res.status(200).json({ message: "Already logged out" });
        }
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Error during logout" });
    }
};