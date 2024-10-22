const getActiveRoute = (pathname: string) => {
  if (
    pathname.startsWith("/dashboard/booking-types/") &&
    pathname !== "/dashboard/booking-types/create"
  ) {
    return {
      id: 10,
      button: "save",
      link: "Edit Booking Type",
      headText: "Edit a booking type",
      url: "booking-types",
    };
  }
  if (pathname === "/dashboard/booking-types/create") {
    return {
      id: 10,
      button: "create",
      link: "Create Booking Type",
      headText: "Create a new booking type",
      url: "booking-types",
    };
  }
  if (pathname === "/dashboard/availability/create") {
    return {
      id: 10,
      button: "create",
      link: "Create Availability",
      headText: "Create your availability settings.",
      url: "availability",
    };
  }
  if (
    pathname !== "/dashboard/availability/create" &&
    pathname.startsWith("/dashboard/availability/")
  ) {
    return {
      id: 10,
      button: "save",
      link: "Create Availability",
      headText: "Create your availability settings.",
      url: "availability",
    };
  }
  return null;
};

export default getActiveRoute;
