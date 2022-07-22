const router = require("express").Router();
const validation = require("../validations/tender.validation");
const validate = require("../middlewares/validation");
const {
  getAllTenders,
  getTenderById,
  addTender,
  updateTender,
  deleteTenderById,
  getAllSellerTenders,
  getAllBuyerTenders,
} = require("../controllers/tenders.controller");

router.get("/seller", getAllSellerTenders);
router.get("/buyer", getAllBuyerTenders);
router.get("/:id", validation.getTenderById(), validate, getTenderById);
router.post("/", validation.createTender(), validate, addTender);
router.patch("/:id", validation.updateTender(), validate, updateTender);
router.delete("/:id", validation.deleteTender(), validate, deleteTenderById);

module.exports = router;
