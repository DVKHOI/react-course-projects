import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { Field } from "../components/field";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import Button from "../components/button/Button";
import ToggleInputPassword from "../components/input/ToggleInputPassword";
import { Label } from "../components/label";
import slugify from "slugify";

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
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    await setDoc(doc(database, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
    });
    // const colRef = collection(database, "users");
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });

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
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <ToggleInputPassword control={control}></ToggleInputPassword>
        </Field>
        <div className="has-account">
          You already have an account? <NavLink to={"/login"}>Login</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full max-w-[300px] mx-auto"
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
