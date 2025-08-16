import {Router} from 'express';
import { OfferController } from '../controllers/offers';

const router = Router();

router.post('/', OfferController.createOffer);
router.get('/', OfferController.getAllOffers);
router.get('/:id', OfferController.getOfferById);
router.put('/:id', OfferController.updateOffer);
router.delete('/:id', OfferController.deleteOffer);

export default router;
