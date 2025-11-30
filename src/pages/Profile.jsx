import { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { getUserInfo } from "../api/user";
import { Link, useNavigate } from "react-router";
import Modal from "../components/Modal";


export default function Profile() {
  const { logout, token } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const userPicUrl = useRef("/DefaultProfilePicIcon.png");
  const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   async function getAccDetails() {
  //     if (!token) return;
  //     try {
  //       const data = await getUserInfo(token);
  //       /*********************************/
  //       console.log(data);
  //       setUserInfo(data);
  //     } catch (error) {
  //       console.error("Error loading account details: ", error);
  //     }
  //   }
  //   getAccDetails();
  // }, [token]);

  // // console.log(userInfo);
  // if (!userInfo) return <p>Loading…</p>;

  return (
    <>
      <div className='profilePic'>
        <img src={userPicUrl.current} alt="avatar" className='userPic' />
        <button className="editBtn" onClick={() => setModalOpen(true)}>Edit</button>
        {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
      </div>
      {/* <div className="profileInfo">
        <h2>{`${userInfo.firstname} ${userInfo.lastname}`}</h2>
      </div> */}
    </>
  );
}
