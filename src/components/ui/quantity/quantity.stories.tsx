import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Quantity } from "./quantity";

const Story: ComponentMeta<typeof Quantity> = {
  title: "Atoms/Quantity",
  component: Quantity,
};
export default Story;

const Template: ComponentStory<typeof Quantity> = (args) => (
  <Quantity qtyValue={1} handleIncrease={() => {}} handleDecrease={() => {}} />
);

export const Default = Template.bind({});
Default.args = {};
