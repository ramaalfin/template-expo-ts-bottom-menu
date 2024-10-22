import Svg, { Path } from "react-native-svg";

export const AktivitasIconActive = ({ width, height }: any) => {
  return (
    <>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <Path
          d="M30.007 13.034C30.0094 12.1704 30.3535 11.3428 30.9641 10.7322C31.5748 10.1215 32.4024 9.77737 33.266 9.775V3.259C33.2636 2.39539 32.9195 1.56783 32.3088 0.957163C31.6981 0.346496 30.8706 0.00237511 30.007 0H3.93898C3.077 0.00291286 2.2514 0.347716 1.64339 0.958725C1.03538 1.56973 0.694648 2.39702 0.695977 3.259V9.776C1.55036 9.79292 2.36392 10.1447 2.96142 10.7557C3.55891 11.3666 3.89254 12.1878 3.89045 13.0424C3.88835 13.8969 3.55069 14.7164 2.9502 15.3245C2.34971 15.9325 1.53443 16.2803 0.679977 16.293V22.81C0.682353 23.6736 1.02647 24.5012 1.63714 25.1118C2.24781 25.7225 3.07537 26.0666 3.93898 26.069H30.007C30.8706 26.0666 31.6981 25.7225 32.3088 25.1118C32.9195 24.5012 33.2636 23.6736 33.266 22.81V16.293C32.4024 16.2906 31.5748 15.9465 30.9641 15.3358C30.3535 14.7252 30.0094 13.8976 30.007 13.034ZM22.807 20.855L16.974 17.108L11.14 20.855L12.9 14.142L7.53998 9.759L14.448 9.352L16.973 2.933L19.48 9.368L26.388 9.775L21.028 14.158L22.804 20.858L22.807 20.855Z"
          fill="#F48120"
        />
      </Svg>
    </>
  );
};