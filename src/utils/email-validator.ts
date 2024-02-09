const temporaryEmailProviders = [
  "yopmail.com",
  "getnada.com",
  "tempmailaddress.com",
  "burnermail.io",
  "maildrop.cc",
  "dispostable.com",
  "tempmailnator.com",
  "mailtemp.net",
  "druselj.com",
  "Armyspy.com",
  "Cuvox.de",
  "dayrep.com",
  "Einrot.com",
  "fleckens.hu",
  "Gusto.com",
  "jourrapide.com",
  "superrito.com",
  "teleworm.us",
  "kkoup.com",
  "Trashmail.fr",
  "My10minutemail.com",
  "trashmail.se",
  "sharklasers.com",
  "guerillamail.info",
  "grr.la",
  "guerillamail.biz",
  "guerillamail.com",
  "guerillamail.de",
  "guerillamail.net",
  "guerillamail.org",
  "guerillamailblock.com",
  "pokemail.net",
  "Spam4.me",
  "getairmail.com",
  "chapsmail.com",
  "Robot-mail.com",
  "tafmail.com",
  "getnada.com",
  "gimpmail.com",
  "tupmail.com",
  "replyloop.com",
  "Getmule.com",
  "guysmail.com",
  "fivermail.com",
  "clowmail.com",
  "dropjar.com",
  "blondmail.com",
  "vomoto.com",
  "temptami.com",
  "givmail.com",
  "spicysoda.com",
  "yft.live",
  "socam.me",
  "clout.wiki",
  "finews.biz",
  "hexi.pics",
  "tutuapp.bid",
  "afia.pro",
  "lyft.live",
  "dropedfor.com",
  "inboxes.com",
  "nicoric.com",
  "fixedfor.com",
  "dropedfor.com",
  "wemel.site",
  "mywrld.top",
  "memeil.top",
  "wemel.top",
  "smartnator.com",
  "femailtor.com",
  "psnator.com",
  "tmpmailtor.com",
];

export const isTemporaryEmail = (email: string) => {
  const domain = email.split("@")[1];
  const domainLocal = email.split("@")[1].split(".")[0];
  const fakeMails =
    domainLocal === "wemel" ||
    domainLocal === "mywrld" ||
    domainLocal === "smartnator" ||
    domainLocal === "psnator" ||
    domainLocal === "memeil" ||
    domainLocal === "femailtor" ||
    domainLocal === "tmpmailtor";

  const isTemporary = temporaryEmailProviders.includes(domain);
  const localPart = email.split("@")[0];
  const hasPlusCharacter = email.includes("+");
  const hasThreeOrMoreDots = localPart.split(".").length > 2;

  return {
    isTemporary,
    hasPlusCharacter,
    fakeMails,
    hasMoreThanTwoDots: hasThreeOrMoreDots,
  };
};
