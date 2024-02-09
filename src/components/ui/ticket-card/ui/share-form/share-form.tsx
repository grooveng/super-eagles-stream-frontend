import { use, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { UseFormRegister } from "react-hook-form";
import styles from "./share-form.module.scss";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ShareFormProps = {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<any>;
  formData: {
    title: string;
    subtitle: string;
    disclaimer: string;
  };
};
export function ShareForm({
  isOpen,
  onClose,
  register,
  formData,
}: ShareFormProps) {
  const { title, subtitle, disclaimer } = formData;
  const shareRef = useRef(null);

  return (
    <TransitionGroup style={{ height: "100%" }}>
      {isOpen && (
        <CSSTransition
          nodeRef={shareRef}
          classNames={{
            enter: styles["share--enter_state"],
            enterActive: styles["share--enter_active_state"],
            exit: styles["share--exit_state"],
            exitActive: styles["share--exit_active_state"],
          }}
          timeout={300}
        >
          <div ref={shareRef} className={styles["share"]}>
            <div className={styles["share__close"]}>
              <button
                className={styles["share__close_btn"]}
                onClick={onClose}
                aria-label="Close form"
                type="button"
              />
            </div>

            <div className={styles["share__body"]}>
              <div className={styles["share__title"]}>{title}</div>
              <div className={styles["share__subtitle"]}>{subtitle}</div>
              <div className={styles["share__form"]}>
                <div className={styles["share__field"]}>
                  <Input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    variant="secondary"
                  />
                </div>
                <div className={styles["share__field"]}>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    variant="secondary"
                  />
                </div>
                <div className={styles["share__field"]}>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    variant="secondary"
                  />
                </div>

                {/* <Button variant={"plain"} type="submit">
                  <span>Share</span>
                </Button> */}
              </div>
              <div className={styles["share__disclaimer"]}>{disclaimer}</div>
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}
