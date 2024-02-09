import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { StreamingChat } from "./streaming-chat";

const Story: ComponentMeta<typeof StreamingChat> = {
  title: "Molecules/StreamingChat",
  component: StreamingChat,
  argTypes: {
    top: {
      defaultValue: {
        title: "Title",
        icon: true,
        username: "username",
        amount: "amount",
      },
    },
    head: {
      defaultValue: {
        subtitle: "Subtitle",
        title: "Title",
        username: "username",
        amount: "amount",
      },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof StreamingChat> = (args) => (
  <StreamingChat {...args} />
);

export const Default = Template.bind({});
Default.args = {};
