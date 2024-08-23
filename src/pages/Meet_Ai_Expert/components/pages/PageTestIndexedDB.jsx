import React, { useState, useEffect } from 'react';
import { saveRecordToIndexedDB, getAllRecordsFromIndexedDB, getRecordByIdFromIndexedDB } from '../../../../utils/indexedDB';
import { fetchPanelList } from '../../../../utils/api'; // 서버 통신 함수
import { Link, useParams } from 'react-router-dom';

const PageTestIndexedDB = () => {
  const [inputValue, setInputValue] = useState(''); // 입력한 숫자를 저장하는 상태
  const [records, setRecords] = useState([]);
  const { id } = useParams();
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
    }
  }, [id]);

  const fetchRecords = async () => {
    const allRecords = await getAllRecordsFromIndexedDB();
    setRecords(allRecords);
  };

  const fetchRecordById = async (recordId) => {
    const record = await getRecordByIdFromIndexedDB(Number(recordId));
    setCurrentRecord(record);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력한 값을 상태에 반영
  };

  const handleSave = async () => {
    try {
      const data = await fetchPanelList({}); // 패널 데이터를 가져옴
      if (data.results && data.results.length > 0) {
        const firstPanel = data.results[0]; // 첫 번째 패널 데이터를 선택
        // 패널 데이터 저장
        await saveRecordToIndexedDB({ id: firstPanel.id, value: firstPanel }); 
        fetchRecords(); // 저장 후 기록 목록을 다시 불러옴
      }
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  return (
    <div>
      <h1>IndexedDB와 서버 통신 테스트</h1>
      <input
        type="text"
        value={inputValue} // 입력한 숫자를 반영
        onChange={handleInputChange} // 숫자가 입력되면 상태를 업데이트
        placeholder="숫자를 입력하세요"
      />
      <button onClick={handleSave}>기본 패널 데이터 가져와 저장</button>

      <h2>최근 기록</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <Link to={`/test-indexeddb/${record.id}`}>기록 {record.id}: {JSON.stringify(record.value)}</Link>
          </li>
        ))}
      </ul>

      {currentRecord && (
        <div>
          <h2>기록 세부정보</h2>
          <p>ID: {currentRecord.id}</p>
          <p>값: {JSON.stringify(currentRecord.value)}</p>
        </div>
      )}
    </div>
  );
};

export default PageTestIndexedDB;
