import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./admin.css";
import { Audio } from "react-loader-spinner";
 import { AiOutlineArrowLeft } from "react-icons/ai";
export const Admin = () => {
  //useNavigate hook to navigate to different routes
  const navigate = useNavigate();
  //setting up the loader
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState([]);
  const [data, setData] = useState([]);
  const [generatedQuestion,setGeneratedQuestion]=useState([]);
 
  useEffect(() => {
    axios
      .get("https://crocodile-scrubs.cyclic.app/admin")
      .then((e) => {
        setData(e.data);
      })
      .then(() => {
        setLoader(false);
      });
    axios.get("https://crocodile-scrubs.cyclic.app/questbank").then((e) => {
      setCount(e.data);
    });
  }, []);
 
  return (
    <div>
      {loader == true ? (
        <div className="loader1">
          <Audio
            height="120"
            width="120"
            radius="9"
            color="antiquewhite"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
          <div className="admin-img"></div>
        </div>
      ) : (
        <div className="main-admin">
          <AiOutlineArrowLeft onClick={(()=>{
            navigate('/')
          })}  fontSize={'32px'} style={{
            paddingLeft:'20px',
            paddingTop:"20px"
          }} />
          <div style={{ marginLeft: "5%" }}>
            <div className="header">
              {" "}
              <div className="welocme-to-admin-page">Welcome to admin page</div>
              <div className="select-10-ques">Select 10 questions</div>{" "}
            </div>
          </div>

          {data.map((e) => {
            return (
              <div
                onClick={() => {
                  // let count=0;
                  // data.forEach((g)=>{
                  //   if(d.disabled==true){
                  //     count++;
                  //   }
                  // })
                  // if(count==10){
                  //   alert("Maximum count reached")
                  // }
                  let newdata = [...data];
                  newdata = newdata.map((t) => {
                    if (e.question == t.question) {
                      return { ...t, disabled: !t.disabled };
                    }
                    return t;
                  });
                  setData(newdata);
                  console.log(newdata);
                }}
                className="single-q"
                style={{
                  minheight: "60px",
                  width: "90%",
                  margin: "auto",
                  backgroundColor: !e.disabled ? "antiquewhite" : "cornsilk",
                  marginTop: "15px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  lineHeight: "24px",
                  boxShadow: e.disabled
                    ? " box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
                    : "",
                }}
              >
                <input
                  className="check-box"
                  onChange={() => {
                    axios.get("https://crocodile-scrubs.cyclic.app/questbank").then((e) => {
                      setCount(e.data);
                    });
                    if (count.length < 10) {
                      axios
                        .post("https://crocodile-scrubs.cyclic.app/questbank", e)
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
          <div className="btn-container">
            <button
              className="generate-link"
              onClick={() => {
                let gk = [];
                data.forEach((h) => {
                  if (h.disabled) {
                    gk.push(h);
                  }
                });
                axios.post("https://crocodile-scrubs.cyclic.app/questbank", gk);
                navigate("/");
              }}
            >
              Add Questions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
