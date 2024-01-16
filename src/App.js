import { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// https://jsonplaceholder.typicode.com/comments

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
  const onCreate = (writer, content, emotion) => {
    const createDate = new Date().getTime();
    const newItem = {
      writer,
      content,
      emotion,
      createDate,
      id: diaryNo.current
    };
    diaryNo.current += 1;
    setData([newItem, ...data]);
  };

  // 일기 삭제
  const onDelete = (targetId) => {
    console.log(`${targetId}번째 일기가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  // 일기 수정
  const onEdit = (targetId, editContent) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, content: editContent} : it)
    )
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data}/>
    </div>
  );
}

export default App;
