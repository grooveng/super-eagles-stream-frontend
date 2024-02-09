import { StreamPass } from "./stream-passes";

export type VideoCarousel = {
  title?: string;
  url?: string;
  cover?: string;
};

export type Artist = {
  id: number;
  name: string;
  imageUrl?: string;
};

export type EventTagShortName = "africa_world" | "x_live" | "nxt_up";
export type EventTag = {
  id: number;
  name: string;
  shortName: EventTagShortName;
};

export type EventMode = "LIVESTREAM" | "ON_DEMAND";

export type Events = {
  id: number;
  title: string;
  startAt: number | Date;
  endAt: number | Date;
  rights: string;
  location?: string;
  venue?: string;
  printUrl: string;
  streamUrl?: string;
  bannerUrl?: string;
  chatUrl?: string;
  musicUrl?: string;
  heroSectionTitle?: string;
  heroSectionDescription?: string;
  heroSectionUrls?: string[];
  videoCarouselTitle?: string;
  videoCarouselDescription?: string;
  videoCarouselUrls?: VideoCarousel[];
  artistGalleryDescription?: string;
  artistGalleryUrls: string[];
  eventVisionHeaderFirst?: string;
  eventVisionHeaderSecond?: string;
  eventVisionHeaderDescription?: string;
  eventVisionHeaderUrls?: [string];
  eventVisionSponsors?: [string];
  isSprayMoneyEnabled?: boolean;
  sprayMoneyCurrencyName?: string;
  sprayMoneyImageUrls?: string[];
  sprayMoneyTopSenderTitle?: string;
  sprayMoneyTopSenderIcon?: string;
  sprayMoneyAllowMTN?: boolean;
  sprayMoneyAllowStripe?: boolean;
  sprayMoneyAllowPaystack?: boolean;
  userId?: number;
  artistId?: number;
  passes?: StreamPass[];
  artist: Artist;
  eventTag: EventTag;
  eventTagId: number;
  eventMode: EventMode;
};
