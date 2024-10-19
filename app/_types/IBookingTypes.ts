export interface IBookingTypes {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  public: "Yes" | "No";
  active: boolean;
  availability: string;
  duration: number;
}

export interface BookingTypesResponse extends IBookingTypes {
  _id: string;
  slug: string;
}
