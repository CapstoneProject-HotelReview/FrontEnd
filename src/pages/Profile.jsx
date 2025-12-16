import { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router";
import Modal from "../components/Profile/Modal";
import ReviewCard from "../components/Profile/ReviewCard";

import { getUserInfo, addUserProfilePic } from "../api/user";

export default function Profile() {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [userPicUrl, setUserPicUrl] = useState("/DefaultProfilePicIcon.png");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function getAccDetails() {
      if (!token) return;
      try {
        const data = await getUserInfo(token);
        /***********************************/
        console.log("Profile Page: ", data);
        setUserInfo(data);
        setUserPicUrl(data.profilepic || "/DefaultProfilePicIcon.png");
      } catch (error) {
        console.error("Error loading account details: ", error);
      }
    }
    getAccDetails();
  }, [token]);

  // console.log(userInfo);
  if (!userInfo) return <p>Loading…</p>;

  const updateUserPic = async (imgSrc) => {
    setUserPicUrl(imgSrc);

    await addUserProfilePic(token, {
      profilePic: imgSrc,
    });
  };

  return (
    <>
      <div className="profile-page">
        <div className="profilePic">
          <img src={userPicUrl} alt="avatar" className="userPic" />
          <button className="editBtn" onClick={() => setModalOpen(true)}>
            Edit
          </button>
          {modalOpen && (
            <Modal
              updateUserPic={updateUserPic}
              closeModal={() => setModalOpen(false)}
            />
          )}
        </div>
        <div className="profileInfo">
          <h2>{`${userInfo.firstname} ${userInfo.lastname}`}</h2>
        </div>
        <div className="userReviews">
          <ReviewCard userInfo={userInfo} token={token} />
        </div>
      </div>
    </>
  );
}