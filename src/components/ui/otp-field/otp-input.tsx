import { ReactNode } from 'react';
import styles from './otp-input.module.scss';
import OTPInput from 'react-otp-input';

type OtpInputProps = {
	otp: string;
	setOtp: React.Dispatch<React.SetStateAction<any>>;
};

export function OtpInput({ otp, setOtp }: OtpInputProps) {
	return (
		<div className={styles['body']}>
			<OTPInput
				value={otp}
				onChange={setOtp}
				numInputs={6}
				inputType="number"
				inputStyle={styles['input_wrapper']}
				renderSeparator={<span> </span>}
				renderInput={(props) => <input {...props} />}
			/>
		</div>
	);
}
