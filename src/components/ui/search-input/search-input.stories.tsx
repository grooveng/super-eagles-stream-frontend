import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchInput } from "./search-input";
import { useForm } from "react-hook-form";

const Story: ComponentMeta<typeof SearchInput> = {
  component: SearchInput,
  title: "Atoms/Input",
};

export default Story;

const Template: ComponentStory<typeof SearchInput> = (args) => {
  const { register } = useForm();

  return <SearchInput {...args} {...register("test")} />;
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
