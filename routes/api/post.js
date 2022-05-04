const router = require("express").Router();
const controllers = require("../../controllers/post.controller");

router.get("/", controllers.onGetAll);

router.get("/:id", controllers.onGetById);
router.get("/barcode/:id", controllers.onGetByBarcode);

router.post("/", controllers.onInsert);

router.put("/:id", controllers.onUpdate);
router.put("/barcode/:id", controllers.onUpdateByBarcode);

router.delete("/:id", controllers.onDelete);
router.delete("/barcode/:id", controllers.onDeleteByBarcode);

module.exports = router;
