import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Dropdown } from "../../components/dropdown";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import UploadImage from "../../components/uploadImage";
import useFirebaseIamge from "../../hooks/useFirebaseIamge";
import Toggle from "../../components/toggle/Toggle";
import { useEffect } from "react";
import { database } from "../../firebase/firebase-config";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { control, watch, handleSubmit, setValue, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryID: "",
      hot: false,
      image: "",
    },
  });
  const {
    progress,
    image,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseIamge(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();
  useEffect(() => {
    async function getData() {
      const colRef = collection(database, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategories(result);
    }
    getData();
  }, []);
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  // const watchCategory = watch("category");

  const addPostHandle = async (values) => {
    try {
      setLoading(true);
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(database, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userID: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!!!");
      reset({
        title: "",
        slug: "",
        status: 2,
        category: "",
        hot: false,
        image: "",
      });
      handleResetUpload();
      setSelectCategory({});
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleSelectCategory = (item) => {
    setValue("categoryID", item.id);
    setSelectCategory(item);
  };
  useEffect(() => {
    document.title = "Sneaker Blogging - Add new post ";
  }, []);
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandle)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              name="title"
              control={control}
              placeholder="Enter your title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <UploadImage
              onChange={handleSelectImage}
              className=" h-[250px]"
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></UploadImage>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectCategory?.name || "Select at Categoris"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleSelectCategory(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
              {/* {selectCategory.name && (
                <span className="inline-block p-3 mt-3 text-sm font-medium bg-gray-200 rounded-lg">
                  {selectCategory.name}
                </span>
              )} */}
            </Dropdown>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>

        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
