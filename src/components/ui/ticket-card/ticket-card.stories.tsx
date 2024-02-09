import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { TicketCard } from "./ticket-card";

const Story: ComponentMeta<typeof TicketCard> = {
  title: "Ui/TicketCard",
  component: TicketCard,
  argTypes: {
    title: {
      defaultValue: "Twice as Tall",
      control: { type: "text" },
    },
    type: {
      defaultValue: "LiveStream + Backstage",
      control: { type: "text" },
    },
    picture: {
      defaultValue: {
        img: "images/ticket-card/1.jpg",
      },
    },
    bgPicture: {
      defaultValue: { img: "images/ticket-card/info_decor.jpg" },
    },
    decorPicture: {
      defaultValue: { img: "images/ticket-card/decor.png" },
    },
    icon: {
      defaultValue: "images/ticket-card/ticket.svg",
    },
    countryIcon: {
      defaultValue: "images/ticket-card/africa.svg",
    },
    name: {
      defaultValue: "Burna Boy",
      control: { type: "text" },
    },
    date: {
      defaultValue: "26-05-2023",
      control: { type: "text" },
    },
    time: {
      defaultValue: "20:00 hrs",
      control: { type: "text" },
    },
    ctaButton: {
      defaultValue: {
        text: "Stream Now",
      },
    },
    formData: {
      defaultValue: {
        title: "Sharing is Caring",
        subtitle: "Send this stream pass to someone you care about!",
        disclaimer: "This action cannot be undone, once the invite is sent.",
        buttonText: "Send Invite",
      },
    },
  },
};

export default Story;

const Template: ComponentStory<typeof TicketCard> = (args) => (
  <div style={{ maxWidth: "40rem" }}>
    <TicketCard {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};
