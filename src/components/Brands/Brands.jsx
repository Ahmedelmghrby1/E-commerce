import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import Brand from "../Brand/Brand";

export default function Brands() {
  let [brands, setBrands] = useState([]);
  async function getBrands() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    // console.log(data.data);
    setBrands(data.data);
  }
  let { data, isError, isLoading, isFetching } = useQuery(
      "getBrands",
      getBrands
    );
  useEffect(() => {
    getBrands();
  }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          {brands.map((item) => 
            <Brand brand={item} key={item._id}/>
          )}
        </div>
      </div>
    </>
  );
}
