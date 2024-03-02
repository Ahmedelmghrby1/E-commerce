import React from "react";

export default function Category({ category }) {
  return (
    <>
      <div className="col-md-3 text-center">
        <img src={category.image} className="w-100" height={200} alt="" />
        <h3>{category.name}</h3>
      </div>
    </>
  );
}
