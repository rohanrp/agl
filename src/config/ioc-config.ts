import { Container } from "inversify";
import "reflect-metadata";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { AzurePersonService } from "../entities/azure-person.service";
import { PersonLookup } from "../interfaces/person-lookup.interface";

const container = new Container();

container.bind<PersonLookup>(SERVICE_IDENTIFIER.REMOTE_WEB_SERVICE).to(AzurePersonService);


export default container;