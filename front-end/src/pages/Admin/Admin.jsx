import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./admin.css";

export const Admin = () => {
  //useNavigate hook to navigate to different routes
  const navigate = useNavigate();
  const [count, setCount] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://digiaccel-c.herokuapp.com/admin").then((e) => {
      setData(e.data);
    });
    axios.get("https://digiaccel-c.herokuapp.com/questbank").then((e) => {
      setCount(e.data);
    });
  }, []);

  return (
    <div>
      <div className="main-admin">
        <div style={{ marginLeft: "5%" }}>
          <h2>Welcome to admin page</h2>

          <h3>Select 10 questions</h3>
        </div>

        {data.map((e) => {
          return (
            <div className="single-q">
              <input
                className="check-box"
                onChange={() => {
                  axios
                    .get("https://digiaccel-c.herokuapp.com/questbank")
                    .then((e) => {
                      setCount(e.data);
                    });
                  if (count.length < 10) {
                    axios
                      .post("https://digiaccel-c.herokuapp.com/questbank", e)
                      .then((e) => {})
                      .catch((er) => {
                        console.log(er);
                      });
                  } else {
                  }
                }}
                type="checkbox"
                name=""
                id=""
                value={e}
                disabled={count.length > 8}
              />
              <label htmlFor="">{e.question}</label>
            </div>
          );
        })}
        <button
          className="generate-link"
          onClick={() => {
            navigate("/");
          }}
        >
          Generate link
        </button>
      </div>
    </div>
  );
};
