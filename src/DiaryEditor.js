import React, { useEffect, useRef, useState } from "react";

const DiaryEditor = ({onCreate}) => {

  const writerInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    writer: "",
    content: "",
    emotion: 1
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if(state.writer.length < 1) {
      writerInput.current.focus();
      return;
    }

    if(state.content.length < 3) {
      contentInput.current.focus();
      return;
    }
    
    onCreate(state.writer, state.content, state.emotion);
    alert("저장 성공");

    // 일기 작성 후 폼에 저장된 데이터가 출력되지 않게 초기화함
    setState({
      writer: "",
      content: "",
      emotion: 1
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input ref={writerInput} name="writer" value={state.writer} onChange={handleChangeState} />
      </div>
      <div>
        <textarea ref={contentInput} name="content" value={state.content} onChange={handleChangeState} />
      </div>
      <div>
        오늘의 감정 점수 :&nbsp;
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  )
};

export default React.memo(DiaryEditor);