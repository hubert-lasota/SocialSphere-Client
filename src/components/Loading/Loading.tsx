import "./loading.css"

type LoadingProps = {
  pageLoading?: boolean
};

export default function Loading(props: LoadingProps) {
  const { pageLoading = false } = props;

  let className; 

  if(pageLoading) {
    className = "spinner"
  } else {
    className = "small-loader"
  }

  return <div className={className}></div>;
}
