const DiaryItem = ({onDelete, id, writer, content, createDate, emotion}) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {writer} | 감정 점수 : {emotion}
        </span>
        <br/>
        <span className="date">{new Date(createDate).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
      <button onClick={() => {
        console.log(id);
        if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
          onDelete(id);
        }
      }}>삭제</button>
    </div>
  )
};




export default DiaryItem;
