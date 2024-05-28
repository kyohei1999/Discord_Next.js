import React, { useContext, useState } from 'react';
import '../css/chat_css/ChatHeader.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import { useToggle } from '../../utils/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { serch, serchCansel } from '../../slice/SerchSlice';
import InboxIcon from '@mui/icons-material/Inbox';
import { HoverMessageIcon } from '../../utils/style';

const ChatHeader = () => {
  const channelName = useAppSelector((state) => state.channel.channelName);
  const [inputText, setInputText] = useState<string>('');
  const [isSelected, BlurHandler, onClickHandler] = useToggle();
  const [isIconSelected, onIconChangeHandler, onIconClickHandler] = useToggle();
  const dispatch = useAppDispatch();

  const clearText = () => {
    setInputText('');
    onIconChangeHandler();
    dispatch(serchCansel());
  };
  //検索欄のアイコンの切り替え
  const InputSerch = (e: React.SetStateAction<string>) => {
    if (e.length > 0) {
      onIconClickHandler();
      dispatch(serchCansel());
    } else {
      onIconChangeHandler();
    }
    setInputText(e);
  };

  //取得した値をChatSerchに渡す
  const serchMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(serch(inputText));
  };

  return (
    <div className="chatHeader">
      <div className="chatHeaderLeft">
        <span className="chatHeaderHash">#</span>
        <h3>{channelName}</h3>
      </div>

      <div className="chatHeaderRight">
        <HoverMessageIcon title="通知設定" arrow>
          <NotificationsIcon></NotificationsIcon>
        </HoverMessageIcon>
        <HoverMessageIcon title="ピン留めされたメッセージ" arrow>
          <PushPinIcon></PushPinIcon>
        </HoverMessageIcon>
        <HoverMessageIcon title="メンバーリストの表示" arrow>
          <PeopleAltIcon></PeopleAltIcon>
        </HoverMessageIcon>

        <div className="chatHeaderSearch">
          <form>
            <input
              type="text"
              className={isSelected ? 'inputSearch' : 'clickSearch'}
              placeholder="検索"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                InputSerch(e.target.value)
              }
              value={inputText}
              onBlur={BlurHandler}
              onClick={onClickHandler}
            ></input>
            <button
              type="submit"
              className="chatInputButton"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                serchMessage(e)
              }
            ></button>
          </form>
          <button onClick={clearText}>
            {isIconSelected ? <CloseIcon /> : <SearchIcon />}
          </button>
        </div>
        <HoverMessageIcon title="受信ボックス" arrow>
          <InboxIcon></InboxIcon>
        </HoverMessageIcon>
        <HoverMessageIcon title="ヘルプ" placement="left">
          <HelpIcon></HelpIcon>
        </HoverMessageIcon>
      </div>
    </div>
  );
};

export default ChatHeader;
