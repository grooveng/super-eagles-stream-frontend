import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

import { OtpField } from "./otp-field";
import { Input } from "../input";

const Story: ComponentMeta<typeof OtpField> = {
  title: "UI/OtpField",
  component: OtpField,
};
export default Story;

const Template: ComponentStory<typeof OtpField> = () => {
  const { register } = useForm();
  return (
    <OtpField>
      <OtpField.Column>
        <Input {...register("firstDigit")} otp />
      </OtpField.Column>
      <OtpField.Column>
        <Input {...register("secondDigit")} otp />
      </OtpField.Column>
      <OtpField.Column>
        <Input {...register("thirdDigit")} otp />
      </OtpField.Column>
      <OtpField.Column>
        <Input {...register("fourthDigit")} otp />
      </OtpField.Column>
      <OtpField.Column>
        <Input {...register("fifthDigit")} otp />
      </OtpField.Column>
    </OtpField>
  );
};

export const Default = Template.bind({});
Default.args = {};
