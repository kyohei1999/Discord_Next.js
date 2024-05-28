import React, { useEffect, useState } from 'react';
import { db } from '../../../app/firebase';
import {
  DocumentData,
  collection,
  query,
  onSnapshot,
  Query,
} from 'firebase/firestore';

interface Servers {
  id: string;
  server: DocumentData;
}

function useServerCollection(data: string) {
  const [doucuments, setDocuments] = useState<Servers[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const cServersResult: Servers[] = [];
      querySnapshot.docs.forEach((doc) =>
        cServersResult.push({ id: doc.id, server: doc.data() })
      );
      setDocuments(cServersResult);
    });
  }, []);

  return { doucuments };
}

export default useServerCollection;
