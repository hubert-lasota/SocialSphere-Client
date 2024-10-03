import { CSSProperties } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type HomeNavigateButtonProps = {
  additionalClassName?: string;
  additionalStyle?: CSSProperties
};

export default function HomeNavigateButton(props: HomeNavigateButtonProps) {
  const { additionalClassName, additionalStyle } = props;
  const navigate = useNavigate();
  return (
    <div style={additionalStyle} className={additionalClassName} onClick={() => navigate("/home")}>
      <AiFillHome />
    </div>
  );
}
