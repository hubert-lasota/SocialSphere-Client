import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartEmpty,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import React from 'react'
import { useNavigate } from 'react-router-dom';

type PostProps = {
  id: number;
  userId: number;
  profilePictureSrc: string;
  firstName: string;
  lastName: string;
  content: string;
  likeCount: number;
  commentCount: number;
  children?: React.ReactNode
};

export default function Post(props: PostProps, ) {
  const { id, userId, profilePictureSrc, firstName, lastName, content, likeCount, commentCount } = props;
  const navigate = useNavigate();
  
  function handleGoOnUserPage(userId: number) {
    navigate(`/user/${userId}`);
  }

  return (
    <div key={id} className="main__post main__post--bg-white">
      <div className="main__post-header">
        <img
          src={profilePictureSrc}
          alt="profile"
          className="main__post-header__profile-picture"
          onClick={() => handleGoOnUserPage(userId)}
        />
        <div className="main__post-header__name">
          <span className="main__post-header__name-text main__post-header__name-text--fsmd main__post-header__name-text--grey ">
            {firstName}
          </span>
          <span className="main__post-header__name-text main__post-header__name-text--fsmd main__post-header__name-text--grey ">
            {lastName}
          </span>
        </div>
      </div>
      <div className="main__post-content">
        <p className="post-content__text--fsmd">{content}</p>
        {props.children}
      </div>
      <div className="main__post-footer">
        <div className="main__post-footer__like">
          <FontAwesomeIcon icon={faHeartFilled} />
          <FontAwesomeIcon icon={faHeartEmpty} />
          <FontAwesomeIcon icon={faComment} />
        </div>
      </div>
    </div>
  );
}
