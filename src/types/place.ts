export interface IPlace {
  id: string;
  title?: string;
  address?: string;
  imageUri?: string;
  position?: {
    latitude: number;
    longitude: number;
  };
}
