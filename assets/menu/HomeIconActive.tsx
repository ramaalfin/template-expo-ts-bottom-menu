import { Image } from "react-native";

export const HomeIconActive = ({ width, height }: any) => {
  return (
    <Image source={require("../icon/ic_beranda_fill.png")} style={{ width, height }} />
  );
};
