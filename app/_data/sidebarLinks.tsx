import Booking from "../_icons/Booking";
import BookingTypes from "../_icons/BookingTypes";
import Integration from "../_icons/Integration";
import Person from "../_icons/Person";
import Settings from "../_icons/Settings";
import Time from "../_icons/Time";
import Wallet from "../_icons/Wallet";

export const sidebarLinks = [
  { id: 1, icon: <BookingTypes />, link: "Booking Types" },
  { id: 2, icon: <Booking />, link: "Booking" },
  {
    id: 3,
    icon: <Time />,
    link: "Availability",
  },
  {
    id: 4,
    icon: <Person />,
    link: "Contact",
  },
  {
    id: 5,
    icon: <Wallet />,
    link: "Wallet",
  },
  { id: 6, icon: <Integration />, link: "Integrations" },
  {
    id: 7,
    icon: <Settings />,
    link: "Settings",
  },
];
