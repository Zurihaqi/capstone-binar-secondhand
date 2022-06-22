const router = require("express").Router();
const controller = require("../controllers/notification.controller");
const validation = require("../validations/notification.validation");
const validate = require("../middlewares/validation");

router.get("/", controller.getAllNotifications);
router.get(
  "/:id",
  validation.getById(),
  validate,
  controller.getNotificationById
);
router.post("/", validation.create(), validate, controller.createNotification);
router.patch(
  "/:id",
  validation.update(),
  validate,
  controller.updateNotification
);
router.delete(
  "/:id",
  validation.deleteNotification(),
  validate,
  controller.deleteNotification
);

module.exports = router;
