import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {
  let navigate=useNavigate()
  const [errorMsg, setErrorMsg] = useState("");
  const [loding, setLoding] = useState(true);
  function sendDataToApi(values) {
    setLoding(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data);
        if(data.message==='success'){
          navigate('/signin')
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setLoding(true)
      });
  }

  // function validate(values){

  //   const myError={}

  //   if(!values.name){
  //     myError.name="name is required"
  //   }

  //   if(!values.email){
  //     myError.email="email is required"
  //   }
  //   if(!/^[A-Z][A-Za-z0-9@]{6,}$/.test(values.password)){
  //     myError.password="password must be 7 characters or more and start with capital letter"
  //   }
  //   if(values.rePassword !== values.password){
  //     myError.rePassword="password and repassword not match "
  //   }

  //   return myError

  // }

  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string().min(2).max(20).required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(/^[A-Z][A-Za-z0-9@]{6,}$/)
        .required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required(),
    });
    return schema;
  }

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      // phone: "",
    },
    validationSchema,
    // validate,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Register Now:</h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="name">name:</label>
          <input
            onBlur={register.handleBlur}
            value={register.values.name}
            onChange={register.handleChange}
            type="text"
            name="name"
            className="form-control mb-3"
            id="name"
          />

          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger">{register.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="email">email:</label>
          <input
            onBlur={register.handleBlur}
            value={register.values.email}
            onChange={register.handleChange}
            type="email"
            name="email"
            className="form-control mb-3"
            id="email"
          />

          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger">{register.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">password:</label>
          <input
            onBlur={register.handleBlur}
            value={register.values.password}
            onChange={register.handleChange}
            type="password"
            name="password"
            className="form-control mb-3"
            id="password"
          />

          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger">{register.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onBlur={register.handleBlur}
            value={register.values.rePassword}
            onChange={register.handleChange}
            type="password"
            name="rePassword"
            className="form-control mb-3"
            id="rePassword"
          />

          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-danger">
              {register.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {/* <label htmlFor="phone">phone:</label>
          <input
            value={register.values.phone}
            onChange={register.handleChange}
            type="phone"
            name="phone"
            className="form-control mb-3"
            id="phone"
          />  */}

          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}

          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loding? 'Signup' : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </div>
  );
}
