const validateEmail = (email: string) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  return emailRegex.test(email);
};

export default validateEmail;
