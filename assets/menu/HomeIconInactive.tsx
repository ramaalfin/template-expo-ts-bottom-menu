import { Image } from "react-native";

export const HomeIconInactive = ({ width, height }: any) => {
  return (
    <Image source={require("../icon/ic_beranda.png")} style={{ width, height }} />
  );
};
