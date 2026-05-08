import express from "express"
import {
  createItem,
  getAllItems,
  getItemById,
  getItemsByOwner,
  updateItem,
  deleteItem,
  updateAvailability,
  getPendingItemsForAdmin,
  approveItemByAdmin,
  rejectItemByAdmin,
} from "../controllers/item.controller.js"
import {authMiddleware, checkRole} from "../middleware/auth.middleware.js"
import {verifyServiceToken} from "../middleware/serviceToken.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post("/", authMiddleware, upload.array("images", 5), createItem)
router.get("/", getAllItems)
router.get("/admin/pending", authMiddleware, checkRole(["admin"]), getPendingItemsForAdmin)
router.get("/owner/:ownerId", authMiddleware, getItemsByOwner)
router.get("/service/:itemId", verifyServiceToken, getItemById)
router.get("/:itemId", authMiddleware, getItemById)
router.put("/:itemId", authMiddleware, upload.array("images", 5), updateItem)
router.delete("/:itemId", authMiddleware, deleteItem)
router.patch("/:itemId/availability", authMiddleware, updateAvailability)
router.patch("/admin/:itemId/approve", authMiddleware, checkRole(["admin"]), approveItemByAdmin)
router.patch("/admin/:itemId/reject", authMiddleware, checkRole(["admin"]), rejectItemByAdmin)

export default router 