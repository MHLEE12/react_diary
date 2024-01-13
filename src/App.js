import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList =[
//   {
//     id: 1,
//     writer: "mh1",
//     content: "안녕 1",
//     emotion: 5,
//     createDate: new Date().getTime()
//   },
//   {
//     id: 2,
//     writer: "mh2",
//     content: "안녕 2",
//     emotion: 1,
//     createDate: new Date().getTime()
//   },
//   {
//     id: 3,
//     writer: "mh3",
//     content: "안녕 3",
//     emotion: 3,
//     createDate: new Date().getTime()
//   }
// ];

function App() {

  const [data, setData] = useState([]); // 배열로 초기값 생성
  
  const diaryNo = useRef(0);

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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data}/>
    </div>
  );
}

export default App;
