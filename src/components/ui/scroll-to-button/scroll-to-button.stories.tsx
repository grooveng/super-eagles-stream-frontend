import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ScrollToButton } from "./scroll-to-button";

const Story: ComponentMeta<typeof ScrollToButton> = {
  title: "ui/ScrollToButton",
  component: ScrollToButton,
};

export default Story;

const Template: ComponentStory<typeof ScrollToButton> = (args) => (
  <>
    <div>Works only on mobile</div>
    <ScrollToButton {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: "tertiary",
};

export const Up = Template.bind({});
Up.args = {
  direction: "up",
};
