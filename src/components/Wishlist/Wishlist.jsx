import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../../context/storeContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Wishlist() {
  let { getWishlist, removeteWishlist, setWishlistCount} = useContext(storeContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await getWishlist();
        setData(data);
      
      console.log(data);
      setLoading(false);
  })();
  }, []);
  async function deleteWishlist(id) {
    let data = await removeteWishlist(id);
    let list= await getWishlist()
    if (data.status == "success") {
      toast.error("Product deleted successfully");
      setWishlistCount(list.count);
      setData(list);
    }
  }
  if (loading) return <Loading />;
  if (data == null || data.count == 0)
    return <h2 className="text-center my-5 text-main">No data in wishlist</h2>;
  return (
    <div className="container my-2  p-3 rounded-1">
      {data?.data.map((item) => {
        return (
          <div key={item._id} className="row bg-main-light py-2 border-bottom">
            <div className="col-md-1">
              <img src={item.imageCover} className="w-100" alt="" />
            </div>
            <div className="col-md-11 d-flex justify-content-between">
              <div className="">
                <p className="m-1">
                  {item.title}
                </p>
                <p className="text-main m-1 p-0">Price:{item.price} EGP</p>
                <button
                  onClick={() => deleteWishlist(item._id)}
                  className="btn m-0 p-0"
                >
                  <i className="fa-solid text-main fa-trash-can"></i>Remove
                </button>
               
             
              </div>
        
            </div>
          
          </div>
        );
      })}
    </div>
  );
}
