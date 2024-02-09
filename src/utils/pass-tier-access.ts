export const passTierAccess = (pass: string) => {
  if (pass === "LIVESTREAM") return 1;
  if (pass === "BACKSTAGE") return 2;
  if (pass === "EXCLUSIVE") return 3;

  return 0;
};
