import "./Header.scss";
import { GiFilmProjector } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { GoSignIn } from "react-icons/go";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import LoginPage from "./auth/LoginPage";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (target.className !== "openModal modal") {
        return window.removeEventListener("click", handleClickOutside);
      }
      console.log(target.className);
      if (modalOpen && target.className === "openModal modal") {
        document.body.style.overflow = "unset";
        setModalOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [modalOpen]);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setModalOpen(true);
  };
  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  const onClickEvent = (e) => {
    const target = e.target.id;

    if (target === "Home") {
      const result = window.confirm("홈페이지로 이동합니까?");
      if (result) {
        alert("홈페이지로 이동합니다.");
        history.push("/");
      } else {
        alert("이동을 취소합니다.");
      }
    }
  };

  return (
    <div className="navbar">
      <ul className="menu">
        <li id="Home" onClick={onClickEvent}>
          <GiFilmProjector /> HiGHLIGHTING
        </li>
        <div className="SignTool">
          <li id="SignIn" onClick={openModal}>
            <GoSignIn /> 회원가입
          </li>
          <li id="LogIn" onClick={openModal}>
            <FiLogIn /> 로그인
          </li>
        </div>
      </ul>
      {modalOpen && (
        <Modal
          // ref={modalEl}
          open={modalOpen}
          close={closeModal}
          Header="회원가입 및 로그인 "
        >
          <LoginPage />
        </Modal>
      )}
    </div>
  );
}
