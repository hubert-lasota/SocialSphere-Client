import { ReactNode } from "react";
import css from "./sign-up.module.css";

type SignUpProps = {
  children: ReactNode
}

export default function SignUp(props: SignUpProps) {
  const { children } = props;
  return (
    <div className={css["sign-up"]}>
      <div className={css["sign-up__col-1"]}>col1</div>
      {children}
      <div className={css["sign-up__col-3-container"]}>
        <div /> <div className={css["sign-up__col-3"]}></div>
      </div>
    </div>
  );
}
