import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { storeContext } from "../../context/storeContext";

export default function Address() {
  let navigate = useNavigate();
  let{id}=useParams()
  const [errorMsg, setErrorMsg] = useState("");
  const [loding, setLoding] = useState(true);
  let {pay} = useContext(storeContext);
async function sendDataToApi(values) {
    setLoding(false);
    let data =await pay(id,values)
    console.log(data);
    if(data.status==="success"){
        window.location.href=data.session.url
   
  }
}
  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city:"",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  

  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>address Now:</h2>
        <form onSubmit={address.handleSubmit}>
          <label htmlFor="details">details:</label>
          <textarea
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            type="text"
            name="details"
            className="form-control mb-3"
            id="details"
          ></textarea>

          <label htmlFor="phone">phone:</label>
          <input
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            type="text"
            name="phone"
            className="form-control mb-3"
            id="phone"
          />
          
          <label htmlFor="city">city:</label>
          <input
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            type="text"
            name="city"
            className="form-control mb-3"
            id="city"
          />


          <button
            disabled={!(address.dirty && address.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loding ? "Pay" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </div>
  );
}
