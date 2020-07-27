import { Router } from 'express';
import PersonController from '../controllers/persons.controller';
import Route from '../interfaces/routes.interface';

class PersonRoute implements Route {
  public path = '/person';
  public router = Router();
  public personController = new PersonController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.personController.getPersons);
    this.router.get(`${this.path}/:category`, this.personController.getPersonByCategory);
    this.router.get(`${this.path}/:category/:ownershipof`, this.personController.getPersonByCategoryOwnerships);
    this.router.get(`${this.path}/:category/:ownershipof/:filtertype/:filtervalue/:ownershipproperty`, this.personController.getPersonByCategoryFilteredOwnerships);
  }
}

export default PersonRoute;
