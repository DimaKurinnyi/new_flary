import style from './Loader.module.scss'
export const Loader = () => {
  return (
    <div className={style.Loader}>
      <div className={style.spin} />
    </div>
  )
}
