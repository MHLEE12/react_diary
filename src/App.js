import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch(action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const createDate = new Date().getTime;
      const newItem = {
        ...action.data,
        createDate
      }
      return [newItem, ...state];
    }
    case 'DELETE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) => it.id === action.targetId ? {...it, content: action.editContent} : it);
    }
    default :
      return state;
  }
}

const App = () => {

  // const [data, setData] = useState([]); // 배열로 초기값 생성
  const [data, dispatch] = useReducer(reducer, []);

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
    dispatch({type:"INIT", data: initData});
  };

  useEffect(() => {
    getApiData();
  }, []);

  // 일기 작성
  const onCreate = useCallback(
    (writer, content, emotion) => {
    
    dispatch({type:"CREATE", data:{writer, content, emotion, id:diaryNo.current}})
    
    diaryNo.current += 1;
  }, []);

  // 일기 삭제
  const onDelete = useCallback((targetId) => {
    dispatch({type:"DELETE", targetId})
  }, []);

  // 일기 수정
  const onEdit = useCallback((targetId, editContent) => {
    dispatch({type:"EDIT", targetId, editContent})
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
