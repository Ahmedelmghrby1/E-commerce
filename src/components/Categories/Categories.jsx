import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import Brand from "../Brand/Brand";
import Category from "../Category/Category";

export default function Categories() {
  let [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    // console.log(data.data);
    setCategories(data.data);
  }
  let { data, isError, isLoading, isFetching } = useQuery(
      "getCategories",
      getCategories
    );
  useEffect(() => {
    getCategories();
  }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          {categories.map((item) => 
            <Category category={item} key={item._id}/>
          )}
        </div>
      </div>
    </>
  );
}
