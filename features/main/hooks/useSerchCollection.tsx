import {
  query,
  where,
  getDocs,
  CollectionReference,
  QuerySnapshot,
  collection,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../../app/firebase';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSerchCollection = (
  collectionName: string,
  channelCollectionName: string,
  subCollectionName: string
) => {
  const channelId = useAppSelector((state) => state.channel.channelId);
  const serverId = useAppSelector((state) => state.server.serverId);
  const inputValue = useAppSelector((state) => state.serch.inputValue);
  const [serchDoucuments, setSerchDocuments] = useState<Messages[]>([]);

  const collectionRef = collection(
    db,
    collectionName,
    String(serverId),
    channelCollectionName,
    String(channelId),
    subCollectionName
  );

  // 入力されたテキストに一致するメッセージを取得するクエリを作成する
  useEffect(() => {
    const q = query(collectionRef, where('message', '==', inputValue));
    onSnapshot(q, (snaphot) => {
      let results: Messages[] = [];
      snaphot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timeStamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      //並び替え
      setSerchDocuments(
        results.sort((a, b) => {
          if (a.timestamp && b.timestamp) {
            return a.timestamp.seconds - b.timestamp.seconds;
          } else {
            const currentDate = new Date();
            return currentDate.getTime() - currentDate.getTime(); // Handle case where both timestamps are null
          }
        })
      );
    });
  }, [inputValue, channelId]);
  return { serchDoucuments };
};
export default useSerchCollection;
