import { Router } from "express";
import offerController from "../controllers/offer_controller.js";
const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const offers = await offerController.getOffers();
    res.json({
      type: "success",
      message: "offers retrieved successfully",
      offers,
    });
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const offers = await offerController.getOffer(id);
    res.json({
      type: "success",
      message: "offers retrieved successfully",
      offers,
    });
  } catch (err) {
    next(err);
  }
});
export default router;
