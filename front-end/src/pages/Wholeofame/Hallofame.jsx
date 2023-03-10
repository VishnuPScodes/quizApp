import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./whole.module.css";
import { Audio } from "react-loader-spinner";
import ParticlesBg from "particles-bg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export const Hallofame = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    setLoader(true);
    axios
      .get(`https://crocodile-scrubs.cyclic.app/hallofame`)
      .then((res) => {
        let infos = res.data;
        infos = infos.sort((a, b) => b.score - a.score);
        setData(infos);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
        setError(true);
      });
  }, []);
  return (
    <div>
      <ParticlesBg bg={true} type="cobweb" color="#1c15f3" num={200} />
      <div className={styles.cont}>
        <AiOutlineArrowLeft
          onClick={() => {
            navigate("/");
          }}
          fontSize={"32px"}
          style={{
            paddingLeft: "20px",
            paddingTop: "20px",
          }}
        />
        <div className={styles.head}> Hall of fame!</div>
        {loader == true ? (
          <div
            style={{
              width: "100px",
              height: "3px",
              margin: "auto",
            }}
          >
            <Audio
              height="120"
              width="120"
              radius="9"
              color="antiquewhite"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        ) : (
          <div>
            {data.map((e, i) => {
              return (
                <div className={styles.user}>
                  {i + 1}.{e.name} (score:{e.score})
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
