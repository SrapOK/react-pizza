import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="126" r="127" />
    <rect x="-2" y="276" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="318" rx="10" ry="10" width="280" height="88" />
    <rect x="57" y="358" rx="0" ry="0" width="0" height="2" />
    <rect x="0" y="439" rx="10" ry="10" width="95" height="30" />
    <rect x="130" y="429" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default MyLoader;
