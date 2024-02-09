import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputLabel } from "./input-label";

const Story: ComponentMeta<typeof InputLabel> = {
  title: "Atoms/InputLabel",
  component: InputLabel,
};

export default Story;

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args}>Lorem ipsum:</InputLabel>
);

export const Primary = Template.bind({});

export const Valid = Template.bind({});
Valid.args = {};
