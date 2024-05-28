import React from 'react';
import '../css/sidebar_css/SidebarChannel.scss';
import { DocumentData } from 'firebase/firestore';
import { useAppDispatch } from '../../hooks';
import { setChannelInfo } from '../../slice/channelSlice';

type Props = {
  id: string;
  channel: DocumentData;
};

const SidebarChannel = (props: Props) => {
  const { id, channel } = props;
  const dispatch = useAppDispatch();
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channel.channel.channelName,
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannel">#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;
