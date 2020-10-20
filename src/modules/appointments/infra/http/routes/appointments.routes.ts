import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmetsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmetsRouter.use(ensureAuthenticated);

appointmetsRouter.post('/', appointmentsController.create);

appointmetsRouter.get('/me', providerAppointmentsController.index);

export default appointmetsRouter;
