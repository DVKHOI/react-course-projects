import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import slugify from "slugify";
import styled from "styled-components";
import { database } from "../../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ data }) => {
  const { image, title, slug } = data;
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchCategory() {
      const docRef = doc(database, "categories", data.categoryID);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    }

    fetchCategory();
  }, [data.categoryID]);
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(database, "users", data.userID);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    }
    fetchUser();
  }, [data.userID]);

  const date = new Date(data?.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data || !data.id) return null;

  return (
    <PostFeatureItemStyles>
      <PostImage url={image} alt="unsplash"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            to={slugify(user?.fullname || "", { lower: true })}
            date={formatDate}
            authorName={user?.fullname}
          ></PostMeta>
        </div>
        <PostTitle size="big" to={slug}>
          {title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
