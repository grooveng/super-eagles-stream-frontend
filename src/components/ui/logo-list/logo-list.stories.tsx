import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LogoList } from "./logo-list";
import { MtnLogo } from "../mtn-logo/mtn-logo";
import { Logo } from "../logo/logo";

const Story: ComponentMeta<typeof LogoList> = {
  title: "Molecules/LogoList",
  component: LogoList,
};
export default Story;

const Template: ComponentStory<typeof LogoList> = () => (
  <LogoList>
    <LogoList.Item>
      <Logo />
    </LogoList.Item>
    <LogoList.Item>
      <MtnLogo />
    </LogoList.Item>
  </LogoList>
);

export const Default = Template.bind({});
Default.args = {};
