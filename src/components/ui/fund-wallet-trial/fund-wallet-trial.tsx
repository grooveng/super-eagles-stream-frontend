import Image from "next/image";
import styles from "./fund-wallet-trial.module.scss";
import { Button } from "../button";
import { Dispatch, SetStateAction } from "react";

type FundWalletTrialProps = {
    isSuccess: boolean;
    setHasTriedToPay: Dispatch<SetStateAction<boolean>>;
};

function FundWalletTrial({ isSuccess, setHasTriedToPay }: FundWalletTrialProps) {
  return (
    <div className={styles["fund-wallet-trial"]}>
      {isSuccess ? (
        <div className={styles["wallet-fund__success"]}>
          <Image
            src="/images/fund-wallet-trial/fund-wallet-trial.svg"
            alt="fund-wallet-feedback"
            width={200}
            height={150}
            className={styles["fundWalletTrial__success"]}
          />
          <p className={styles["fund-success-message"]}>
            Congrats! Your Wallet has been updated
          </p>
        </div>
      ) : (
        <>
          <div className={styles["wallet-fund__failed"]}>
            <Image
              src="/images/fund-wallet-trial/fund-wallet-failed.svg"
              alt="fund-wallet-feedback"
              width={200}
              height={120}
              className={styles["fundWalletTrial__failed"]}
            />
            <p className={styles["fund-failed-message"]}>Your Payment Failed</p>
            <div className={styles["fund-failed-button"]}>
              <Button handleClick={() => setHasTriedToPay(false)}>Try Again</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FundWalletTrial;
