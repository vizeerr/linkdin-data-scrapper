var db = require('../models');
const Profile = db.profile;

var addProfile = async (req, resp) => {
    try {
        const { name, url, about, bio, location, followerCount, connectionCount } = req.body;
        
        let data = await Profile.create({
            name,
            url,
            about,
            bio,
            location,
            followerCount,
            connectionCount
        });

        let response = {
            data: "Profile added successfully"
        };

        resp.status(200).json(response);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: "An error occurred while adding the profile." });
    }
};

module.exports = {
    addProfile
};
