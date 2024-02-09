import { NotFoundSection } from "@/components/section/404-section/404-section";

export const NoAccessToStream = () => {
  return (
    <NotFoundSection
      img="images/savannah-4.svg"
      btnText="Let’s do this Right"
      text="Oops! We can’t tell if you have a stream pass for this event."
    />
  );
};
