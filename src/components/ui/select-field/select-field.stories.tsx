import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectField } from "./select-field";

const Story: ComponentMeta<typeof SelectField> = {
  title: "UI/SelectField",
  component: SelectField,
  argTypes: {
    id: {
      defaultValue: "select_field_id",
    },
    label: {
      defaultValue: "Select label",
    },
    options: {
      defaultValue: [
        { value: "option_1", label: "Option 1" },
        { value: "option_2", label: "Option 2" },
        { value: "option_3", label: "Option 3" },
      ],
    },
  },
};

export default Story;

const Template: ComponentStory<typeof SelectField> = (args) => (
  <SelectField {...args} />
);

export const Default = Template.bind({});
