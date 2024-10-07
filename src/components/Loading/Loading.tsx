import { CSSProperties } from "react";
import "./loading.css"

type LoadingProps = {
  pageLoading?: boolean
  additionalStyle?: CSSProperties
};

export default function Loading(props: LoadingProps) {
  const { pageLoading = false, additionalStyle } = props;

  let className; 

  if(pageLoading) {
    className = "spinner"
  } else {
    className = "small-loader"
  }

  return <div className={className} style={additionalStyle}></div>;
}
