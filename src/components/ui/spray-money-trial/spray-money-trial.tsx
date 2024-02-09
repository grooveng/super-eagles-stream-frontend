import Image from "next/image";
import styles from "./spray-money-trial.module.scss";
import { Button } from "../button";

type SprayMoneyTrialProps = {
  isSuccess: boolean;
  amount: string;
};

function SprayMoneyTrial({ isSuccess, amount }: SprayMoneyTrialProps) {
  return (
    <div className={styles["spray-money-trial"]}>
      {isSuccess ? (
        <div className={styles["money-spray__success"]}>
          <Image
            src="/images/spray-money-trial/spray-money-success.svg"
            alt="spray-money-feedback"
            width={200}
            height={150}
            className={styles["sprayMoney__success"]}
          />
          <p className={styles["spray-moneySuccess-message"]}>
            Your spray money order for ₦ {amount} has been received
          </p>
        </div>
      ) : (
        <>
          <div className={styles["money-spray___failed"]}>
            <Image
              src="/images/spray-money-trial/spray-money-failure.svg"
              alt="spray-money-feedback"
              width={200}
              height={120}
              className={styles["sprayMoney__failed"]}
            />
            <p className={styles["sprayMoneyfailed-message"]}>
              We could not process your spray money transaction
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default SprayMoneyTrial;
