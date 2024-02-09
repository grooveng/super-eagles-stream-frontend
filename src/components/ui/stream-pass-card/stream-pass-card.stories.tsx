import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { StreamPassCard } from "./stream-pass-card";

const Story: ComponentMeta<typeof StreamPassCard> = {
  title: "Molecules/StreamPassCard",
  component: StreamPassCard,
  argTypes: {
    img: {
      defaultValue: "/images/stream-pass/stream_card_1.jpg",
    },
    bgImg: {
      defaultValue: "/images/stream-pass/stream_decor_1.jpg",
    },
    icon: {
      defaultValue: "/images/stream-pass/earth.svg",
    },
    title: {
      defaultValue: "Title",
      control: { type: "text" },
    },
    date: {
      defaultValue: "01-01-2000",
      control: { type: "text" },
    },
    duration: {
      defaultValue: "00:00 hrs",
      control: { type: "text" },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof StreamPassCard> = (args) => (
  <StreamPassCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
