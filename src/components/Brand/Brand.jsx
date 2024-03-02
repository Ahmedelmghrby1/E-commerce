import React from "react";

export default function Brand({ brand }) {
  return (
    <>
      <div className="col-md-3 text-center">
        <img src={brand.image} alt="" />
        <h3>{brand.name}</h3>
      </div>
    </>
  );
}
