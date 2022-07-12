import React from "react";
import ImgSlider from "./ImgSlider";
import styled from "styled-components";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trendings from "./Trendings";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/users/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let trending = [];
  let originals = [];
  let newDisneys = [];

  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapshot) => {
      snapshot.docs.map((doc) => {
        // console.log(doc.data().type)
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });
      const uniqueIds = [];
      const uniqueRecommends = recommends.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.id);

        if (!isDuplicate) {
          uniqueIds.push(element.id);

          return true;
        }

        return false;
      });

      const uniquenew = [];
      const uniqueNewDisney = newDisneys.filter((element) => {
        const isDuplicate = uniquenew.includes(element.id);

        if (!isDuplicate) {
          uniquenew.push(element.id);

          return true;
        }

        return false;
      });
      const uniqueorginal = [];
      const uniqueOriginal = originals.filter((element) => {
        const isDuplicate = uniqueorginal.includes(element.id);

        if (!isDuplicate) {
          uniqueorginal.push(element.id);

          return true;
        }

        return false;
      });
      const uniquetrending = [];
      const uniqueTrendings = trending.filter((element) => {
        const isDuplicate = uniquetrending.includes(element.id);

        if (!isDuplicate) {
          uniquetrending.push(element.id);

          return true;
        }

        return false;
      });

      dispatch(
        setMovies({
          recommended: uniqueRecommends,
          newDisney: uniqueNewDisney,
          trending: uniqueTrendings,
          original: uniqueOriginal,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trendings />
    </Container>
  );
};
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
