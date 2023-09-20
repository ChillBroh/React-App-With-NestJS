import React from "react";
import { useParams } from "react-router-dom";

const Welcome = () => {
  const { token } = useParams();

  return <div>Welcome User : {token}</div>;
};

export default Welcome;
