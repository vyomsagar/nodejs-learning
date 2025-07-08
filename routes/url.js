import express from "express";

import { handleGenerateNewShortUrl, handleGetAnalytics } from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortID", handleGetAnalytics)

export default router;