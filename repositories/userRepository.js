import User from '../models/userModel.js';

async function getUsers() {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
}

async function findUserByUsername(username) {
    try {
        return await User.findOne({ username });
    } catch (error) {
        console.error('Error finding user by username:', error);
        return null;
    }
}

async function findUserByEmail(email) {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.error('Error finding user by email:', error);
        return null;
    }
}

async function findUserById(id) {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error('Error finding user by id:', error);
        return null;
    }
}

async function createUser(userData) {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function updateUserLastLogin(userId) {
    try {
        return await User.findByIdAndUpdate(
            userId,
            { lastLogin: new Date() },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating user last login:', error);
        throw error;
    }
}

async function updateUser(userId, updateData) {
    try {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export default {
    getUsers,
    findUserByUsername,
    findUserByEmail,
    findUserById,
    createUser,
    updateUserLastLogin,
    updateUser,
    deleteUser
}; 