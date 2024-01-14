import { useState, useRef } from "react";

const DiaryItem = ({
  onEdit,
  onDelete, 
  id, 
  writer, 
  content, 
  createDate, 
  emotion
}) => {

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleDelete = () => {
    if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 3) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }

  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {writer} | 감정 점수 : {emotion}
        </span>
        <br/>
        <span className="date">{new Date(createDate).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea ref={localContentInput} value={localContent} onChange={(e)=>setLocalContent(e.target.value)} />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>취소</button>
          <button onClick={handleEdit}>저장</button>
        </>
      ) : (
        <>
          <button onClick={toggleIsEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </div>
  )
};




export default DiaryItem;
