import React from 'react';
import icon from '../../images/loadingicon.gif';

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
