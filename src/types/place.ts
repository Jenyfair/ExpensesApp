import { Location } from "./location";

export interface IPlace {
  id: string;
  title: string;
  address?: string;
  imageUri?: string;
  location?: Location;
}
