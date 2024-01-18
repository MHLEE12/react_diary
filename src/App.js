import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {

  const [data, setData] = useState([]); // 배열로 초기값 생성
  
  const diaryNo = useRef(0);

  const getApiData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    
    const initData = res.slice(0, 20).map((it) => {
      return {
        writer: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        createDate: new Date().getTime(),
        id: diaryNo.current++
      }
    });
    setData(initData);
  };

  useEffect(() => {
    getApiData();
  }, []);

  // 일기 작성
  const onCreate = useCallback(
    (writer, content, emotion) => {
    const createDate = new Date().getTime();
    const newItem = {
      writer,
      content,
      emotion,
      createDate,
      id: diaryNo.current
    };
    diaryNo.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  // 일기 삭제
  const onDelete = useCallback((targetId) => {
    setData(data => data.filter((it) => it.id !== targetId));
  }, []);

  // 일기 수정
  const onEdit = useCallback((targetId, editContent) => {
    setData(data =>
      data.map((it) => it.id === targetId ? {...it, content: editContent} : it)
    )
  }, []);

  const getDiaryAnalysis = useMemo(
    () => {

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data}/>
    </div>
  );
}

export default App;
