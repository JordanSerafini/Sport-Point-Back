import express from "express";
import controller from "../controllers/controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
  });


// Route login
router.post('/expense', controller.addExpense);
router.get('/expense', controller.getAllExpense);
router.delete('/expense/:id', controller.deleteExpense);

//Route user
router.post('/user', controller.addUser);
router.get('/users', controller.getAllUsers);





export default router