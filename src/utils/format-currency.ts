export const formatCurrency = (
  amount: number,
  currencyCode: string,
  locale: string
): string => {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });

    return formatter.format(amount);
  } catch (error) {
    console.error("Currency formatting error:", error);
    return "";
  }
};
