import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { useQuery } from "react-query";

export default function Products() {
  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isError, isLoading, isFetching } = useQuery(
    "getProduct",
    getProduct
  );
  // console.log(data?.data.data);

  // let [products, setProducts] = useState([]);
  // let [loading, setLoading] = useState(true);
  // async function getProduct() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   // console.log(data.data);
  //   setProducts(data.data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   getProduct();
  // }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          {data?.data.data.map((item) => {
            return <Product item={item} key={item._id}/>
          })}
        </div>
      </div>
    </>
  );
}
