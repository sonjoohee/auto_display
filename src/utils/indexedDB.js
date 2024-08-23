// utils/indexedDB.js
import axios from 'axios';

export const fetchDataById = async (id) => {
  try {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/data/${id}`; // 숫자에 해당하는 데이터 가져오기
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyAppDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('records', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('IndexedDB Error: ' + event.target.errorCode);
    };
  });
};

export const saveRecordToIndexedDB = async (record) => {
  const db = await openDB();
  const transaction = db.transaction('records', 'readwrite');
  const store = transaction.objectStore('records');
  return new Promise((resolve, reject) => {
    const request = store.add(record);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to save record to IndexedDB');
  });
};

export const getAllRecordsFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction('records', 'readonly');
  const store = transaction.objectStore('records');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to fetch records from IndexedDB');
  });
};

export const getRecordByIdFromIndexedDB = async (id) => {
  const db = await openDB();
  const transaction = db.transaction('records', 'readonly');
  const store = transaction.objectStore('records');
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to fetch record from IndexedDB');
  });
};
