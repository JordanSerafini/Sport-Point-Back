import express from "express";
import controller from "../controllers/controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


// Routes pour les informations
router.get('/informations', controller.getAllInformations);
router.get('/informations/:id', controller.getInformationById);
router.post('/informations', controller.createInformation);
router.put('/informations/:id', controller.updateInformation);
router.delete('/informations/:id', controller.deleteInformation);


export default router