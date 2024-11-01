import { Image } from 'react-native';

export const ApprovalIconInactive = ({ width, height }: any) => {
  return (
    <Image source={require("../icon/ic_check.png")} style={{ width, height }} />
  );
};
