import React from "react";
import "./Title.css";

const Title: React.FC = () => {
  return (
    <div className="title">
      <h1>blocusign</h1>
      <p>
        Decentralized PDF Signatures.
        <br />
        No Gas, No Hassle.
      </p>
    </div>
  );
};

export default Title;