import Heading from "../../components/layout/Heading";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { database } from "../../firebase/firebase-config";
const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    document.title = "Sneaker Blogging";
    const colRef = collection(database, "posts");
    const queris = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    let result = [];
    onSnapshot(queris, (snapshot) => {
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
