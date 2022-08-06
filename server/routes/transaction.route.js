const router = require("express").Router();
const controller = require("../controllers/transaction.controller");
const validation = require("../validations/transaction.validation");
const validate = require("../middlewares/validation");

router.get("/", controller.getAllTransaction);
router.get("/seller", controller.getAllTransactionAsSeller);
router.get("/buyer", controller.getAllTransactionAsBuyer);
router.get(
  "/:id",
  validation.getById(),
  validate,
  controller.getTransactionById
);
router.post("/", validation.create(), validate, controller.createTransaction);
router.patch(
  "/:id",
  validation.update(),
  validate,
  controller.updateTransaction
);
router.delete(
  "/:id",
  validation.delete(),
  validate,
  controller.deleteTransaction
);

module.exports = router;
