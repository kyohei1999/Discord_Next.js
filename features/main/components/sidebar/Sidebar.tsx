import React, { useContext, useEffect, useState } from 'react';
import '../css/sidebar_css/Sidebar.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '../../../../app/firebase';
import { useAppSelector } from '../../hooks';
import useCollection from '../../hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';
import { useToggle } from '../../utils/common';
import { HoverMessageIcon } from '../../utils/style';
import useServerCollection from '../../hooks/useServerCollection';
import SidebarServer from './SidebarServer';
import Dialog from '@mui/material/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const { doucuments: channels } = useCollection('servers', 'channels');
  const serverId = useAppSelector((state) => state.server.serverId);
  const serverName = useAppSelector((state) => state.server.serverName);
  const { doucuments: servers } = useServerCollection('servers');
  const [showChannels, setShowChannels] = useToggle();
  const [serverOpen, setSreverOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);
  const [inputserverName, setInputServerName] = useState('');
  const [inputChannelName, setInputChannelName] = useState('');

  //新規チャンネルの追加
  const addchannel = async () => {
    let channelName = inputChannelName;
    if (channelName) {
      await addDoc(collection(db, 'servers', String(serverId), 'channels'), {
        channelName: channelName,
      });
    }
    chanelhandleClose();
  };
  //新規サーバーの追加
  const addserver = async () => {
    // let serverName: string | null = prompt('新しいサーバーを作成します');
    let serverName = inputserverName;
    if (serverName) {
      const docRef = await addDoc(collection(db, 'servers'), {
        serverName: serverName,
      });
      await addDoc(collection(db, 'servers', String(docRef.id), 'channels'), {
        channelName: '一般',
      });
    }
    serverhandleClose();
  };

  const handleServerNameChange = (e: any) => {
    setInputServerName(e.target.value);
  };

  const handleChannelNameChange = (e: any) => {
    setInputChannelName(e.target.value);
  };

  const serverHandleClickOpen = () => {
    setSreverOpen(true);
  };

  const serverhandleClose = () => {
    setSreverOpen(false);
  };
  const chanelHandleClickOpen = () => {
    setChannelOpen(true);
  };

  const chanelhandleClose = () => {
    setChannelOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebarLeft">
        <div className="serverIconMain">
          <img src="/images/discordIcon.png" alt=""></img>
        </div>
        {servers.map((server) => (
          <SidebarServer key={server.id} server={server} id={server.id} />
        ))}
        <HoverMessageIcon title="新しいサーバーを作成" placement="right">
          <div className="serverAddIcon">
            <AddIcon
              className="AddIcon"
              fontSize="large"
              onClick={serverHandleClickOpen}
            ></AddIcon>
          </div>
        </HoverMessageIcon>
        <Dialog open={serverOpen} onClose={serverhandleClose}>
          <DialogTitle>サーバーをカスタマイズ</DialogTitle>
          <DialogContent>
            <DialogContentText>
              新しいサーバーの名前を設定して、個性を出しましょう。
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="server"
              name="text"
              label="サーバー名"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleServerNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={serverhandleClose}>戻る</Button>
            <Button onClick={() => addserver()}>新規作成</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>{serverName + 'のサーバー'}</h3>
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </div>

        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <button onClick={setShowChannels}>
                {showChannels ? (
                  <KeyboardArrowRightIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </button>
              <h4 className="text">テキストチャンネル</h4>
            </div>
            <HoverMessageIcon title="新しいチャンネルを作成" placement="top">
              <AddIcon
                className="sidebarAddIcon"
                onClick={chanelHandleClickOpen}
              ></AddIcon>
            </HoverMessageIcon>
            <Dialog open={channelOpen} onClose={chanelhandleClose}>
              <DialogTitle>チャンネルを作成</DialogTitle>
              <DialogContent sx={{ width: 400 }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="server"
                  name="text"
                  label="#チャンネル名"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChannelNameChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={chanelhandleClose}>戻る</Button>
                <Button onClick={() => addchannel()}>チャンネルを作成</Button>
              </DialogActions>
            </Dialog>
          </div>
          {!showChannels && (
            <div className="sidebarChannelList">
              {channels.map((channel) => (
                <SidebarChannel
                  key={channel.id}
                  channel={channel}
                  id={channel.id}
                />
              ))}
            </div>
          )}

          <div className="sidebarFooter">
            <div className="sidebarAccount">
              <img src={user?.photo} alt="" onClick={() => auth.signOut()} />
              <div className="accounName">
                <h4>{user?.displayName}</h4>
                <span>#{user?.uid.substring(0, 4)}</span>
              </div>
            </div>

            <div className="sidebarVoice">
              <MicIcon></MicIcon>
              <HeadphonesIcon></HeadphonesIcon>
              <SettingsIcon></SettingsIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
