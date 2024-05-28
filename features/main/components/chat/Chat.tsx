import React, { useEffect, useState } from 'react';
import '../css/chat_css/Chat.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChatMessage from './ChatMessage';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../../app/firebase';
import useSubCollection from '../../hooks/useSubCollection';
import ChatSerch from './ChatSerch';
import useSerchCollection from '../../hooks/useSerchCollection';
import { MyPagination } from '../../utils/style';

const Chat = () => {
  const [inputText, setInputText] = useState<string>('');
  const serverId = useAppSelector((state) => state.server.serverId);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user);
  const serchFlag = useAppSelector((state) => state.serch.flag);

  const { subDoucuments: messages } = useSubCollection(
    'servers',
    'channels',
    'messages'
  );
  const { serchDoucuments: serchMessages } = useSerchCollection(
    'servers',
    'channels',
    'messages'
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 1ページあたりのアイテム数

  // 現在のページのデータを計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = serchMessages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    //バリデーションチェック
    if (!inputText.trim()) {
      return;
    }
    //先頭のスペースを削除
    const trimmedValue = inputText.trimStart();

    const collectionRef: CollectionReference = collection(
      db,
      'servers',
      String(serverId),
      'channels',
      String(channelId),
      'messages'
    );

    const docref: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: trimmedValue,
        timeStamp: serverTimestamp(),
        user: user,
      }
    );

    setInputText('');
  };

  return (
    <div className="chat">
      <ChatHeader />
      <div className="chatContent">
        <div className={serchFlag ? 'chatMessage' : 'maxChatMessage'}>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              messageid={message.messageid}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          ))}
        </div>
        {serchFlag && (
          <div className="chatSerchList">
            <div className="chatSerchListHeader">
              <p>{serchMessages.length + '件ヒット'}</p>
            </div>
            <h3>{'# ' + channelName}</h3>
            {currentMessages.map((message, index) => (
              <ChatSerch
                key={index}
                message={message.message}
                timestamp={message.timestamp}
                user={message.user}
              />
            ))}
            {serchMessages.length > itemsPerPage && (
              <div className="pagiNationContents">
                <MyPagination
                  className="pagiNation"
                  color="primary"
                  count={Math.ceil(serchMessages.length / itemsPerPage)} // ページの総数
                  page={currentPage} // 現在のページ
                  onChange={(e: React.ChangeEvent<unknown>, page: number) =>
                    setCurrentPage(page)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon></AddCircleOutlineIcon>
        <form>
          <input
            type="text"
            placeholder={'#' + channelName + 'へメッセージを送信'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          ></button>
        </form>
        <div className="chatInputIcon">
          <CardGiftcardIcon></CardGiftcardIcon>
          <GifIcon></GifIcon>
          <InsertEmoticonIcon></InsertEmoticonIcon>
        </div>
      </div>
    </div>
  );
};

export default Chat;
