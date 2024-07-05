import "./loading.css"

type LoadingProps = {
  className: string;
};

export default function Loading(props: LoadingProps) {
  const { className } = props;
  return <div className={className}></div>;
}
