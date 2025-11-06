import express from "express";

const router = express.Router();

router.get("/", getAllConnectionRequests);
router.post("/", createConnectionRequest);
router.patch("/:id", acceptOrRejectConnectionRequest);

export default router;
