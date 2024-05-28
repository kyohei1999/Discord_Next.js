import React from 'react';
import '../css/chat_css/ChatSerch.scss';
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

type Props = {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const ChatSerch = (props: Props) => {
  const { message, timestamp, user } = props;

  return (
    <div className="ChatSerchList">
      <Avatar src={user?.photo}></Avatar>
      <div className="serchMessageInfo">
        <h4>
          {user?.displayName}
          <span className="serchMessageTimeStamp">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatSerch;
