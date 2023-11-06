import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
const router = Router();
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.get("/", getAllJobs);
router.post("/", checkForTestUser, validateJobInput, createJob);
router.get("/stats", showStats);
router.get("/:id", validateIdParam, getJob);
router.patch(
  "/:id",
  checkForTestUser,
  validateJobInput,
  validateIdParam,
  updateJob
);
router.delete("/:id", checkForTestUser, validateIdParam, deleteJob);

export default router;
