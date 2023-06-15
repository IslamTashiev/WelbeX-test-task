export interface Vehicle {
    id: string;
    name: string;
    car_category: VehicleCategory;
    serial_number: string;
    phone_number: number;
    lat: number;
    lng: number;
}
export enum VehicleCategory {
    Cargo = 1,
    Passenger = 2,
    Special = 3,
}