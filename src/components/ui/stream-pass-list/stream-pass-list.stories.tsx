import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { StreamPassList } from "./stream-pass-list";

const Story: ComponentMeta<typeof StreamPassList> = {
  title: "Molecules/StreamPassList",
  component: StreamPassList,
  argTypes: {
    data: {
      defaultValue: [
        {
          img: "/images/stream-pass/stream_card_1.jpg",
          bgImg: "/images/stream-pass/stream_decor_1.jpg",
          icon: "/images/stream-pass/earth.svg",
          title: "Davido",
          date: "26-04-2023",
          duration: "20:00 hrs",
        },
        {
          img: "/images/stream-pass/stream_card_2.jpg",
          bgImg: "/images/stream-pass/stream_decor_2.jpg",
          icon: "/images/stream-pass/africa.svg",
          title: "Burna Boy",
          date: "26-05-2023",
          duration: "20:00 hrs",
          variant: "v2",
        },
        {
          img: "/images/stream-pass/stream_card_3.jpg",
          bgImg: "/images/stream-pass/stream_decor_1.jpg",
          icon: "/images/stream-pass/negeria.svg",
          title: "Davido",
          date: "26-04-2023",
          duration: "20:00 hrs",
          variant: "v3",
        },
        {
          img: "/images/stream-pass/stream_card_3.jpg",
          bgImg: "/images/stream-pass/stream_decor_1.jpg",
          icon: "/images/stream-pass/earth.svg",
          title: "Asake",
          date: "26-05-2023",
          duration: "20:00 hrs",
        },
        {
          img: "/images/stream-pass/stream_card_3.jpg",
          bgImg: "/images/stream-pass/stream_decor_1.jpg",
          icon: "/images/stream-pass/earth.svg",
          title: "Davido",
          date: "26-04-2023",
          duration: "20:00 hrs",
        },
        {
          img: "/images/stream-pass/stream_card_3.jpg",
          bgImg: "/images/stream-pass/stream_decor_1.jpg",
          icon: "/images/stream-pass/earth.svg",
          title: "Davido",
          date: "26-04-2023",
          duration: "20:00 hrs",
        },
        {
          img: "/images/stream-pass/stream_card_3.jpg",
          bgImg: "/images/stream-pass/stream_decor_1.jpg",
          icon: "/images/stream-pass/earth.svg",
          title: "Davido",
          date: "26-04-2023",
          duration: "20:00 hrs",
        },
      ],
    },
  },
};
export default Story;

const Template: ComponentStory<typeof StreamPassList> = (args) => (
  <StreamPassList {...args} />
);

export const Default = Template.bind({});
Default.args = {};
