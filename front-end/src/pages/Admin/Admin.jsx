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
    axios.get("http://localhost:2000/admin").then((e) => {
      setData(e.data);
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
                  console.log("e is", e);
                  axios.get("http://localhost:2000/questbank").then((e) => {
                    setCount(e.data);
                  });
                  if (count.length != 9) {
                    axios
                      .post("http://localhost:2000/questbank", e)
                      .then((e) => {
                        console.log(e.data);
                      })
                      .catch((er) => {
                        console.log(er);
                      });
                  } else {
                    alert("10 questions already added");
                  }
                }}
                type="checkbox"
                name=""
                id=""
                value={e}
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
