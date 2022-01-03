import { useReducer, useEffect, useState } from "react";
import { firebase, timestamp } from "../firebase/config";
import { documentPoint, collectionPoint } from "../utilities/converter";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

type CreatedAt = {
  createdAt: firebase.firestore.Timestamp; // 追加したい型
};

const firestoreReducer = (state: any, action: any) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = () => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action: any) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async <T,>(collection: string, doc: T) => {
    // 型定義の拡張
    type TWithCreatedAt = CreatedAt & T;
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = collectionPoint<TWithCreatedAt>(collection).add({
        ...doc,
        createdAt,
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      }
    }
  };

  // delete a document
  const deleteDocument = async <T,>(collection: string, id: string) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await documentPoint<T>(collection, id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  // update a document
  const updateDocument = async <T,>(
    collection: string,
    id: string,
    updates: any
  ) => {
    dispatch({ type: "IS_PENDING" });
    try {
      // const updatedDocument = await ref.doc(id).update(updates);
      const updatedDocument = await documentPoint<T>(collection, id).update(
        updates
      );
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err) {
      if (err instanceof Error) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      }
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
