import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Input } from "../components/input";
import { Lable } from "../components/lable";
import { useAuth } from "../context/auth-context";
import AuthenticationPage from "./AuthenticationPage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("Please enter your password"),
});

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLogin = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form
        className="main-input"
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
      >
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
          You not have had an account?{" "}
          <NavLink to={"/resgiter"}>Resgiter</NavLink>
        </div>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Login
        </Button>
      </form>
      <div className="main-logo">
        <img srcSet="/login.png " alt="" className="main-logo_img" />
      </div>
    </AuthenticationPage>
  );
};

export default LoginPage;
