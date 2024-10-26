function formatToNaira(amountInKobo) {
  const naira = amountInKobo;
  // if(String(amountInKobo).includes("."))
  //   const naira = amountInKobo / 100; // Convert kobo to naira
  return naira.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
}

export default formatToNaira;
