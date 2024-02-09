import { CountryInputProps, countries } from "./country";

export const parsePhoneNumber = (
  countryCode?: CountryInputProps,
  phone?: string
) => {
  if (!countryCode || !phone) {
    return "";
  }

  if (
    countryCode.value?.startsWith("+234") ||
    countryCode.value?.startsWith("234")
  ) {
    const phoneNumber = phone.length > 10 ? phone.substring(1) : phone;

    const number = `${countryCode.value}${phoneNumber}`.split("+")[1];
    return number;
  }

  return `${countryCode.value}${phone}`.split("+")[1];
};

export const splitPhoneNumber = (phone?: string) => {
  if (!phone) return "";

  if (phone.startsWith("+234")) {
    return phone.substring(4);
  }

  return phone;
};

export const splitPhoneNumberByCountry = (
  phoneDialCode?: string,
  phoneNumber?: string
) => {
  if (!(phoneDialCode && phoneNumber)) return "";

  let foundCountry = countries.find(
    (country) => country.dial_code === phoneDialCode
  );

  return foundCountry?.code
    ? phoneNumber.substring(foundCountry.dial_code.length)
    : "";
};
