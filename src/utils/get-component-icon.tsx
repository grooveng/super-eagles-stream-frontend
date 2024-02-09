import { GeneralIcon, StreamPassesIcon } from "@/assets";
import { CalendarIcon } from "@/components/ui/icons/calendar";
import { EarthIcon } from "@/components/ui/icons/earth";
import { MtnIcon } from "@/components/ui/icons/mtn";
import { PaymentIcon } from "@/components/ui/icons/payment";
import { ScheduleIcon } from "@/components/ui/icons/schedule";
import { TechIssuesIcon } from "@/components/ui/icons/tech-issues";
import { TierIcon } from "@/components/ui/icons/tier";
import { UserIcon } from "@/components/ui/icons/user";
import { WatchIcon } from "@/components/ui/icons/watch";
import { TicketIcon } from "@/components/ui/ticket-icon";

export const getComponentIcon = (categorySlug: string) => {
  switch (categorySlug) {
    case "account-set-up":
      return <UserIcon/>
    case "events-navigation":
      return <GeneralIcon/>
    case "general-questions":
      return <GeneralIcon/>
    case "payments":
      return <PaymentIcon/>
    case "stream-passes":
      return <StreamPassesIcon/>
    case "technical-issues":
      return <TechIssuesIcon />
    case "watching":
      return <WatchIcon/>
  }
  }
