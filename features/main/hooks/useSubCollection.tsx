import React, { useEffect, useState } from 'react';
import { db } from '../../../app/firebase';
import {
  DocumentData,
  collection,
  query,
  onSnapshot,
  Query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { useAppSelector } from '../hooks';

interface Messages {
  messageid: string;
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  channelCollectionName: string,
  subCollectionName: string
) => {
  const serverId = useAppSelector((state) => state.server.serverId);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [subDoucuments, setSubDocuments] = useState<Messages[]>([]);

  useEffect(() => {
    const collectionRef = collection(
      db,
      collectionName,
      String(serverId),
      channelCollectionName,
      String(channelId),
      subCollectionName
    );

    onSnapshot(collectionRef, (snaphot) => {
      let results: Messages[] = [];
      snaphot.docs.forEach((doc) => {
        results.push({
          messageid: doc.id,
          timestamp: doc.data().timeStamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });

      setSubDocuments(
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
  }, [serverId, channelId]);

  return { subDoucuments };
};

export default useSubCollection;
