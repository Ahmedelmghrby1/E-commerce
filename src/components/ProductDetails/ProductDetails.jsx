import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
    let{counter,setCounter,addToCart}=useContext(storeContext)
  let x = useParams();
  let [product, setProduct] = useState([]);
  let [loading , setLoading] = useState(true)
  let [btnLoading, setBtnLoading] = useState(true);
  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${x.id}`
    );
    setProduct(data.data);
    setLoading(false)
  }

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
  useEffect(() => {
    getProduct();
  }, []);
  if (loading) return <Loading/>
  return (
    <div>
      <div className="container my-5">
        <div className="row d-flex align-items-center">
          <div className="col-md-3">
            <img src={product.imageCover} className="w-100" alt="" />
          </div>
          <div className="col-md-9">
            <h4>{product.title}</h4>
            <p className="my-3">{product.description}</p>
            <div>
            <span>{product.category.name}</span>
                <div className="d-flex justify-content-between my-3"> 
                    <div>
                        {product.price} EGP
                        </div>
                        <div>
                      <i className="fa-solid fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </div>
                </div>
            </div>
            <button onClick={()=>addProductToCart(product._id)} className="btn bg-main text-white w-100"> {btnLoading ? "Add To Cart" : "loading..."}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
