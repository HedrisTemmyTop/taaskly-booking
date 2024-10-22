export interface Time {
  id: number;
  from: string;
  to: string;
}

export interface Day {
  isActive: boolean;
  time: Time[];
}

export interface IAvailability {
  _id: string;
  name: string;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
  disabled: boolean;
  owner: string;
  updatedAt: Date;
  createdAt: Date;
  slug: string;
}

export interface IAvailabilityDoc {
  _doc: IAvailability;
}
