import React, { useState } from "react";
import { Lable } from "../components/lable";
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("Please enter your password"),
});
const ResgiterPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    document.title = "Resgiter Page";
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleResgiter = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    const colRef = collection(database, "users");
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    toast.success("Resgiter successfully!");
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form
        className="main-input"
        onSubmit={handleSubmit(handleResgiter)}
        autoComplete="off"
      >
        <Field>
          <Lable htmlFor="fullname">Fullname</Lable>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Lable htmlFor="email">Email address</Lable>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          />
        </Field>
        <Field>
          <Lable htmlFor="password">Password</Lable>
          <Input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            control={control}
          >
            {!showPass ? (
              <IconEyeClose onClick={() => setShowPass(true)}></IconEyeClose>
            ) : (
              <IconEyeOpen onClick={() => setShowPass(false)}></IconEyeOpen>
            )}
          </Input>
        </Field>
        <div className="has-account">
          You already have an account? <NavLink to={"/login"}>Login</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          Resgiter
        </Button>
      </form>
      <div className="main-logo">
        <img srcSet="/resgiter.png " alt="" className="main-login_img" />
      </div>
    </AuthenticationPage>
  );
};

export default ResgiterPage;
