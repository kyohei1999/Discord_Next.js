import React from 'react';
import '../css/chat_css/ChatMessage.scss';
import { Avatar, Tooltip } from '@mui/material';
import { HoverMessageIcon } from '../../utils/style';
import {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  Timestamp,
  collection,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../hooks';
import { db } from '@/app/firebase';

type Props = {
  messageid: string;
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const ChatMessage = (props: Props) => {
  const serverId = useAppSelector((state) => state.server.serverId);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const { messageid, message, timestamp, user } = props;

  const deleteMessage = async () => {
    const messageDocRef = doc(
      db,
      'servers',
      String(serverId),
      'channels',
      String(channelId),
      'messages',
      String(messageid)
    );
    try {
      // コレクション内のドキュメントを取得
      await deleteDoc(messageDocRef);
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };
  return (
    <div className="message">
      <Avatar src={user?.photo}></Avatar>
      <div className="messageInfo">
        <h4>
          {user?.displayName}
          <span className="messageTimeStamp">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
      <HoverMessageIcon title="メッセージを削除" placement="top">
        <DeleteIcon
          className="deleteButton"
          fontSize="large"
          onClick={deleteMessage}
        />
      </HoverMessageIcon>
    </div>
  );
};

export default ChatMessage;
