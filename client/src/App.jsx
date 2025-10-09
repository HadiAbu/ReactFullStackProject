import { useEffect, useState } from "react";
import PostList from "./components/PostList";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Let's go for a hot ride..</h1>
      <p>{message}</p>
      <PostList />
    </div>
  );
}

export default App;
