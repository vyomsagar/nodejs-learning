import { nanoid } from "nanoid";
import { URL } from "../models/url.js";

export const handleGenerateNewShortUrl = async(req, res) => {
    const body = req.body;
    if(!body.url) return res.state(400).json({error: 'URL is required'})
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home", {
        id:shortID
    });
}

export const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortID;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks:result.visitHistory.length, analytics: result.visitHistory });
}