import { Image } from 'react-native';

export const ApprovalIconActive = ({ width, height }: any) => {
  return (
    <Image source={require("../icon/ic_check_fill.png")} style={{ width, height }} />
  );
};
