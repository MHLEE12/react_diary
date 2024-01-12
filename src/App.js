import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList =[
  {
    id: 1,
    writer: "mh1",
    content: "안녕 1",
    emotion: 5,
    createDate: new Date().getTime()
  },
  {
    id: 2,
    writer: "mh2",
    content: "안녕 2",
    emotion: 1,
    createDate: new Date().getTime()
  },
  {
    id: 3,
    writer: "mh3",
    content: "안녕 3",
    emotion: 3,
    createDate: new Date().getTime()
  }
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
