import React, { useEffect } from "react";
import styles from "./Header.module.css";
import styled from "styled-components";
import { provider } from "../firebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/users/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userName]);
  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
        auth.signOut().then(() => {
            dispatch(setSignOutState());
            history.push("/");
        }).catch((error) => {
            alert(error.message);
        })
        
        
    }
  };
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img
          src={window.location.origin + "/images/logo.svg"}
          alt="Disney logo"
        />
      </div>
      {!userName ? (
        <a className={styles.login} onClick={handleAuth}>
          Login
        </a>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img
                src={window.location.origin + "/images/home-icon.svg"}
                alt="HOME"
              />
              <span>HOME</span>
            </a>
            <a href="">
              <img
                src={window.location.origin + "/images/search-icon.svg"}
                alt="SEARCH"
              />
              <span>SEARCH</span>
            </a>
            <a href="">
              <img
                src={window.location.origin + "/images/watchlist-icon.svg"}
                alt="WATCHLIST"
              />
              <span>WATCHLIST</span>
            </a>
            <a href="">
              <img
                src={window.location.origin + "/images/original-icon.svg"}
                alt="ORIGINALS"
              />
              <span>ORIGINALS</span>
            </a>
            <a href="">
              <img
                src={window.location.origin + "/images/movie-icon.svg"}
                alt="MOVIES"
              />
              <span>MOVIES</span>
            </a>
            <a href="">
              <img
                src={window.location.origin + "/images/series-icon.svg"}
                alt="SERIES"
              />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <img src={userPhoto} className={styles.userImg} alt="user photo" />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </nav>
  );
};

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgb(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 13px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;
const SignOut = styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  position: relative;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  img{
    border-radius: 50%;
    width:100%;
    height:100%;
  }

  &:hover {{
    ${DropDown} {
        opacity: 1;
        transition-duration: 1s;
    }
  }
  
  `;

export default Header;
