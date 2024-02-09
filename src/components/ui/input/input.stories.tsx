import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";
import { useForm } from "react-hook-form";

const Story: ComponentMeta<typeof Input> = {
  component: Input,
  title: "Atoms/Input",
};

export default Story;

const Template: ComponentStory<typeof Input> = (args) => {
  const { register } = useForm();

  return <Input {...args} {...register("test")} />;
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
