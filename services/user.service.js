const User = require("../models/User"),
    config = require("../configs/app"),
    jwt = require("jsonwebtoken"),
    {
        ErrorBadRequest,
        ErrorNotFound,
        ErrorUnauthorized,
    } = require("../configs/errorMethods");

const methods = {
    find(req) {
        const _q = {};

        return new Promise(async (resolve, reject) => {
            try {
                const obj = await User.find({});
                resolve(obj);
            } catch (error) {
                reject(ErrorNotFound(error.message));
            }
        });
    },

    findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await User.findById(id);
                if (!obj) reject(ErrorNotFound("id: not found"));
                resolve(obj.toJSON());
            } catch (error) {
                reject(ErrorNotFound("id: not found"));
            }
        });
    },

    insert(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = new User(data);
                const inserted = await obj.save();
                resolve(inserted);
            } catch (error) {
                reject(ErrorBadRequest(error.message));
            }
        });
    },

    update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await User.findById(id);
                if (!obj) reject(ErrorNotFound("id: not found"));
                await User.updateOne({ _id: id }, data);
                resolve(Object.assign(obj, data));
            } catch (error) {
                reject(error);
            }
        });
    },

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await User.findById(id);
                if (!obj) reject(ErrorNotFound("id: not found"));
                await User.deleteOne({ _id: id });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },

    login(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await User.findOne({ username: data.username });
                if (!obj) {
                    reject(ErrorUnauthorized("username not found"));
                }

                if (!obj.validPassword(data.password)) {
                    reject(ErrorUnauthorized("password is invalid."));
                }

                resolve({ accessToken: obj.generateJWT(obj), userData: obj });
            } catch (error) {
                reject(error);
            }
        });
    },

    refreshToken(accessToken) {
        return new Promise(async (resolve, reject) => {
            try {
                const decoded = jwt.decode(accessToken);
                const obj = await User.findOne({ username: decoded.username });
                if (!obj) {
                    reject(ErrorUnauthorized("username not found"));
                }
                resolve({ accessToken: obj.generateJWT(obj), userData: obj });
            } catch (error) {
                reject(error);
            }
        });
    },
};

module.exports = { ...methods };
