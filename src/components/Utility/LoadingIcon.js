import React from 'react';
import icon from '../../image/loadingIcon.gif';

const LoadingIcon = () => {
  return(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        maxWidth: "100vw"
      }}
    >
      <img src={icon} alt="" />
    </div>
  );
}

export default LoadingIcon;
