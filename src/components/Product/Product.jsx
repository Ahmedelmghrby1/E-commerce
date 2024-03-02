import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";

export default function Product({ item }) {
  let { counter, setCounter, addToCart,getWishlist,addToWishlist,setWishlistCount } = useContext(storeContext);
  let [btnLoading, setBtnLoading] = useState(true);

  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItem);
      setBtnLoading(true);
    }
  }

  async function addWishlistToCart(productId) {
    let data = await addToWishlist(productId);
    let list= await getWishlist()
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setWishlistCount(list.count);
    }
  }

  return (
    <>
      <div className="col-md-2">
        <div className="product cursor-pointer rounded-3 p-3 position-relative">
        <button 
            onClick={() => addWishlistToCart(item._id)}
            className="btn position-absolute "
          >
            <i className="fa-regular fa-heart mx-3 cartIcon"></i>
          </button>
          <Link to={"/product-details/" + item._id}>
            <img src={item.imageCover} className="w-100" alt="" />
            <span className="text-main font-sm">{item.category.name}</span>
            <h5 className="my-2 fw-bold">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between my-3">
              <div>{item.price} EGP</div>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>

          <button 
          disabled={!btnLoading}
            onClick={() => addProductToCart(item._id)}
            className="btn bg-main w-100 text-white"
          >
            {btnLoading ? "Add To Cart" : "loading..."}
          </button>
          
        </div>
      </div>
    </>
  );
}
