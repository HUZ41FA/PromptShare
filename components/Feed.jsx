"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, searchText, handleTagClick }) => {
  debugger;
  data = data.filter(
    (p) =>
      searchText === "" ||
      p.prompt.toLowerCase().includes(searchText) ||
      p.tag.includes(searchText)
  );
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  console.log("Render Feed");
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = async (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleTagClick = (post) => {
    setSearchText(post.tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        alert(response.status);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          onChange={handleSearchChange}
          value={searchText}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        searchText={searchText}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
