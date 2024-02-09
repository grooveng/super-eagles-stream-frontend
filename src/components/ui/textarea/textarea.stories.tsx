import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Textarea } from "./textarea";
import { useForm } from "react-hook-form";

const Story: ComponentMeta<typeof Textarea> = {
  component: Textarea,
  title: "Atoms/Textarea",
};

export default Story;

const Template: ComponentStory<typeof Textarea> = (args) => {
  const { register } = useForm();

  return <Textarea {...args} {...register("test")} />;
};

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "Keyword",
};
