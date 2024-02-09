import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Title } from "./title";

const Story: ComponentMeta<typeof Title> = {
  title: "Atoms/Title",
  component: Title,
  argTypes: {
    decor: {
      defaultValue: false,
      options: [true, false],
      control: { type: "radio" },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof Title> = (args) => (
  <Title tag="h1" {...args}>
    Some title
  </Title>
);

export const Default = Template.bind({});
Default.args = {};
