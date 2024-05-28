import React, { useEffect, useState } from 'react';
import { db } from '../../../app/firebase';
import { DocumentData, collection, onSnapshot } from 'firebase/firestore';
import { useAppSelector } from '../hooks';

interface Channels {
  id: string;
  channel: DocumentData;
}

const useCollection = (
  collectionName: string,
  channelCollectionName: string
) => {
  const serverId = useAppSelector((state) => state.server.serverId);
  const [doucuments, setDocuments] = useState<Channels[]>([]);
  const collectionRef = collection(
    db,
    collectionName,
    String(serverId),
    channelCollectionName
  );

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResult: Channels[] = [];
      querySnapshot.docs.forEach((doc) =>
        channelsResult.push({ id: doc.id, channel: doc.data() })
      );
      setDocuments(channelsResult);
    });
  }, [serverId]);

  return { doucuments };
};

export default useCollection;
