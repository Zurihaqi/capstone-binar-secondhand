const router = require("express").Router();
const validation = require("../validations/tender.validation");
const validate = require("../middlewares/validation");
const {
  getAllTenders,
  getTenderById,
  addTender,
  updateTender,
  deleteTenderById,
} = require("../controllers/tenders.controller");

router.get("/", getAllTenders);
router.get("/:id", validation.getTenderById(), validate, getTenderById);
router.post("/", validation.createTender(), validate, addTender);
router.put("/:id", validation.updateTender(), validate, updateTender);
router.delete("/:id", validation.deleteTender(), validate, deleteTenderById);

module.exports = router;
