import { Router } from "express";
import { list, getById, create, update, remove, dashboard } from "../controllers/invoiceController.js";

const router = Router();
router.get("/dashboard", dashboard);
router.get("/", list);
router.get("/:id", getById);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
