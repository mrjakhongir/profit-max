export const maskCardNumber = (cardNumber: string) => {
  // Remove all spaces and non-digits
  const cleaned = cardNumber.replaceAll(/\D/g, "");

  // Get first 4 and last 4 digits
  const first4 = cleaned.slice(0, 4);
  const last4 = cleaned.slice(-4);

  return `${first4} **** **** ${last4}`;
};
