const Service = require("../services/post.service");

const methods = {
    async onGetAll(req, res) {
        try {
            const result = await Service.find(req);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onGetById(req, res) {
        try {
            const result = await Service.findById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onGetByBarcode(req, res) {
        try {
            const query = { barcode: req.params.id };
            const result = await Service.find(query);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onInsert(req, res) {
        try {
            const result = await Service.insert(req.body);
            res.success(result, 201);
        } catch (error) {
            res.error(error);
        }
    },

    async onUpdate(req, res) {
        try {
            const result = await Service.update(req.params.id, req.body);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onUpdateByBarcode(req, res) {
        try {
            const result = await Service.updateByBarcode(
                req.params.id,
                req.body
            );
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onDelete(req, res) {
        try {
            await Service.delete(req.params.id);
            res.success("success", 204);
        } catch (error) {
            res.error(error);
        }
    },

    async onDeleteByBarcode(req, res) {
        try {
            await Service.deleteByBarcode(req.params.id);
            res.success("success", 204);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
