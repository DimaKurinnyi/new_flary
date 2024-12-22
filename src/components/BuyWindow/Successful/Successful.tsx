import style from './Successful.module.scss'

export const Successful = () => {
	return (
		<div className='main_container_success' >
			<div className={style.check_container}>
				<div className={style.check_background}>
					<svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<div className={style.check_shadow}></div>
			</div>
		</div>
	)
}
