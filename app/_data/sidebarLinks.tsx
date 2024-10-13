import Booking from "../_icons/Booking";
import BookingTypes from "../_icons/BookingTypes";
import Integration from "../_icons/Integration";
import Person from "../_icons/Person";
import Settings from "../_icons/Settings";
import Time from "../_icons/Time";
import Wallet from "../_icons/Wallet";

export const sidebarLinks = [
  {
    id: 1,
    icon: <BookingTypes />,
    link: "Booking Types",

    headText: "Configure the types of bookings you offer.",
    button: "Add Booking",
  },
  {
    id: 2,
    icon: <Booking />,
    link: "Booking",
    headText: "See upcoming and past bookings here",
  },
  {
    id: 3,
    icon: <Time />,
    link: "Availability",
    headText: "Configure times when you are available for bookings.",
    button: "Add Availability",
  },
  {
    id: 4,
    icon: <Person />,
    link: "Contact",
    headText: "Record of individuals who have booked with you",
  },
  {
    id: 5,
    icon: <Wallet />,
    link: "Wallet",
    headText: "Manage your wallet balance here",
  },
  {
    id: 6,
    icon: <Integration />,
    link: "Integrations",
    headText: "Connect your account with other services",
  },
  {
    id: 7,
    icon: <Settings />,
    link: "Settings",
    headText: "Manage your bookings account settings here",
  },
];
