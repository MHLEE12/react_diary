const DiaryItem = ({id, writer, content, createDate, emotion}) => {
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
    </div>
  )
};




export default DiaryItem;
