export interface Agent {
  id: string;
  name: string;
  email: string;
  photo: string;
  properties: Property[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  bookings: Booking[];
  reviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  propertyId: string;
  userId: string;
  createdAt: Date;
  property: Property;
  user: User;
}

export interface Booking {
  id: string;
  checkIn: Date;
  checkOut: Date;
  propertyId: string;
  userId: string;
  property: Property;
  user: User;
  payment?: Payment | null;
}

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  bookingId: string;
  booking: Booking;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  photos: string[];
  type: PropertyType;
  agentId: string;
  bookings: Booking[];
  agent: Agent;
  reviews: Review[];
}

export enum PaymentStatus {
  PENDING,
  COMPLETED,
  FAILED,
}

export enum PropertyType {
  CITY,
  RURAL,
  MOUNTAIN,
  TROPICAL,
}
