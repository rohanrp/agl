import { NextFunction, Request, Response } from 'express';
import PersonService from '../services/person.service';
import { Person } from 'interfaces/person.interface';

class PersonController {
  public personService = new PersonService();

  public getPersons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUPersonsData: Person[] = await this.personService.getPersons();
      res.status(200).json(findAllUPersonsData);
    } catch (error) {
      next(error);
    }
  }

  public getPersonByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const personListByCategory: {[x: string]: Pick<Person, never>[]} = await this.personService.getPersonByCategory(req.params.category);
      res.status(200).json(personListByCategory);
    } catch (error) {
      next(error);
    }
  }

  public getPersonByCategoryOwnerships = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const personListByCategoryOwnerships: {[topLevelCategory: string]: any[]} = await this.personService.getPersonByCategoryOwnerships(req.params.category, req.params.ownershipof);
      res.status(200).json(personListByCategoryOwnerships);
    } catch (error) {
      next(error);
    }
  }

  public getPersonByCategoryFilteredOwnerships = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const personListByCategoryFilteredOwnerships: {[topLevelCategory: string]: any[]} = await this.personService.getPersonByCategoryFilteredOwnerships(req.params.category, req.params.ownershipof, req.params.filtertype, req.params.filtervalue, req.params.ownershipproperty);
      res.status(200).json(personListByCategoryFilteredOwnerships);
    } catch (error) {
      next(error);
    }
  }
}

export default PersonController;
