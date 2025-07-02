const express = require("express");
const controller = require("../../controllers/admin/rank-admin-controller");
const { adminAuthMiddleware } = require("../../middleware");
const { updateRank } = require("../../services/admin/rank-admin-service");
const router = express.Router();

router.get("/", adminAuthMiddleware, controller.getRanks);
router.post("/", adminAuthMiddleware, controller.createRank);
router.put("/:id", adminAuthMiddleware, controller.updateRank);
router.delete("/:id", adminAuthMiddleware, controller.deleteRank);
router.get("/members", adminAuthMiddleware, controller.getMembersWithRank);

module.exports = router;