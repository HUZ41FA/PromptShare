"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    if (response.ok) {
      debugger;
      const data = await response.json();
      setPosts(data);
    } else {
      alert(response.status);
    }
  };

  useEffect(() => {
    debugger;
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    debugger;
    const hasConfirmed = confirm("Are your sure your want to proceed?");

    if (hasConfirmed) {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter((p) => p._id != post._id);
      setPosts(filteredPosts);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your perosnalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
