import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmetsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmetsRouter.use(ensureAuthenticated);

// appointmetsRouter.get('/', async (request, response) => {
//  const appointments = await appointmentsRepository.find();
//
// return response.json(appointments);
// });

appointmetsRouter.post('/', appointmentsController.create);

export default appointmetsRouter;
