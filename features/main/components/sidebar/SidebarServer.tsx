import React, { use, useEffect } from 'react';
import '../css/sidebar_css/SidebarServer.scss';
import {
  DocumentData,
  getDocs,
  DocumentSnapshot,
  collection,
  CollectionReference,
  QuerySnapshot,
} from 'firebase/firestore';
import { useAppDispatch } from '../../hooks';
import { setServerInfo } from '../../slice/serverSlice';
import { HoverMessageIcon } from '../../utils/style';
import { setChannelInfo } from '../../slice/channelSlice';
import { db } from '@/app/firebase';
import { serchCansel } from '../../slice/SerchSlice';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
  server: DocumentData;
};

const SidebarServer = (props: Props) => {
  const { id, server } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleServerClick = async () => {
    router.push(`/server/${id}`);
    dispatch(
      setServerInfo({
        serverId: id,
        serverName: server.server.serverName,
      })
    );

    // コレクションリファレンスを取得
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      'servers',
      String(id),
      'channels'
    );
    // コレクション内のドキュメントを取得
    const choicesSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collectionRef
    );
    const channelId = choicesSnapshot.docs[0].id;
    const channelName = choicesSnapshot.docs[0].data();

    dispatch(
      setChannelInfo({
        channelId: channelId,
        channelName: channelName.channelName,
      })
    );
    dispatch(serchCansel());
  };

  return (
    <HoverMessageIcon
      title={server.server.serverName + 'のサーバー'}
      placement="left"
    >
      <div className="sidebarServer" onClick={handleServerClick}>
        <p>のサーバー</p>
      </div>
    </HoverMessageIcon>
  );
};

export default SidebarServer;
