import { CSSProperties } from "react";

type AppProps = {
  position: { x: string; y: string };
  children: React.ReactNode;
};

export const App = (props: AppProps) => {
  const style: CSSProperties = {
    position: "absolute",
    left: props.position.x,
    top: props.position.y,
    zIndex: 2147483550,
  };
  return <div style={style}>{props.children}</div>;
};
