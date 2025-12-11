import React from "react";
import Banner from "../Banner/Banner";

// const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <div className="rounded-3xl my-8">
        <Banner></Banner>
      </div>
    </div>
  );
};

export default Home;
