
const express = require("express");
const { userAdminController } = require("../../controllers/admin");
const { adminAuthMiddleware } = require("../../middleware");
const router = express.Router();

router.get("/", adminAuthMiddleware, userAdminController.getUsers);
router.post("/", adminAuthMiddleware, userAdminController.createUser);
router.get("/:id", adminAuthMiddleware, userAdminController.getUserById);
router.put("/:id", adminAuthMiddleware, userAdminController.updateUser);
router.delete("/:id", adminAuthMiddleware, userAdminController.deleteUser);
router.patch("/:id/status", adminAuthMiddleware, userAdminController.updateUserStatus);
router.get("/high-value-customers", adminAuthMiddleware, userAdminController.getHighValueCustomers);
module.exports = router;
