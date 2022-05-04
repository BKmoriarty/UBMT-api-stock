const Post = require("../models/Post"),
    config = require("../configs/app"),
    { ErrorBadRequest, ErrorNotFound } = require("../configs/errorMethods");

const methods = {
    find(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await Post.find({});
                resolve(obj);
            } catch (error) {
                reject(ErrorNotFound(error.message));
            }
        });
    },

    findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await Post.findById(id).populate("author");
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
                const obj = new Post(data);
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
                const obj = await Post.findById(id);
                if (!obj) reject(ErrorNotFound("id: not found"));
                await Post.updateOne({ _id: id }, data);
                resolve(Object.assign(obj, data));
            } catch (error) {
                reject(error);
            }
        });
    },

    updateByBarcode(code, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await Post.find({ barcode: code });
                if (!obj) reject(ErrorNotFound("barcode: not found"));
                await Post.updateOne({ barcode: code }, data);
                // resolve(Object.assign(obj, data));
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await Post.findById(id);
                if (!obj) reject(ErrorNotFound("id: not found"));
                await Post.deleteOne({ _id: id });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteByBarcode(code) {
        return new Promise(async (resolve, reject) => {
            try {
                const obj = await Post.find({ barcode: code });
                if (!obj) reject(ErrorNotFound("barcode: not found"));
                await Post.deleteOne({ barcode: code });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
};

module.exports = { ...methods };
