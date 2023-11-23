import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
import axios from "axios";

const Home = () => {
  let [input, setInput] = useState(""); // ["" , function(){}
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState(""); // ["" , function(){}
  const AUTH = "07OOLvzquz7jCC5CeDpconlg5ikiN6lGe9yTY7Zk6faogX12rgvAdDzy";
  const initialURL = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: AUTH },
    });
    // console.log(result);
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  const morePicture = async () => {
    let newURL;

    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?per_page=15&page=${page + 1}`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    setPage(page + 1);

    let result = await axios.get(newURL, {
      headers: { Authorization: AUTH },
    });
    setData([...data, ...result.data.photos]);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>More</button>
      </div>
    </div>
  );
};

export default Home;
