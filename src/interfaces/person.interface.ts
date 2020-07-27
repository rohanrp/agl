import { Pet } from "./pet.interface";

export interface Person {
  name: string;
  gender: string;
  age: number;
  pets: Pet[];
}
