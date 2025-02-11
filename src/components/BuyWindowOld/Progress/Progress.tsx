import style from './Progress.module.scss';

//@ts-ignore
export const Progress = ({ progress }) => {
  return (
    <div className={style.progress} >
      <p style={progress <= 100 ? { marginLeft: `${progress - 11}%` } : { marginLeft: '85%' }}>{progress}%</p>
      <div className={style.progress_bar}>
        <div className={style.progress_thumb} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};