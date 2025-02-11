import { useEffect } from 'react';
import style from './Successful.module.scss';
import useStore from "@/store";
import {useAccount} from "wagmi";
declare global {
	interface Window {
		adroll?: {
			track: (event: string, data: Record<string, unknown>) => void;
			record_user: (data: { adroll_segments: string }) => void;
		};
	}
}

export const Successful = () => {
	const {address} = useAccount();

	const {
		token,
		tokensFromAmount,
		network,
	} = useStore();


	useEffect(() => {
		const checkAdRoll = () => {
			if (window.adroll) {
				console.log('AdRoll loaded');
				try {
					console.log('Recording user');
					console.log(tokensFromAmount);
					window.adroll.record_user({ adroll_segments: 'f98223a2' });
					window.adroll.track('purchase', {
						ORDER_ID: network || "UNKNOWN",
						USER_ID: address || "UNKNOWN",
						conversion_value: tokensFromAmount || "0",
						currency: token || "USD",
					});
				} catch (err) {
					console.error('AdRoll error:', err);
				}
			} else {
				console.log('AdRoll not loaded yet');
				setTimeout(checkAdRoll, 1000);
			}
		};

		checkAdRoll();
	}, [address, network, token, tokensFromAmount]);

	return (
		<div className="main_container_success">
			<div className={style.check_container}>
				<div className={style.check_background}>
					<svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7 25L27.3077 44L58.5 7"
							stroke="white"
							stroke-width="13"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div className={style.check_shadow}></div>
			</div>
		</div>
	);
};
// const script = document.createElement("script");
// script.type = "text/javascript";
// script.async = true;
// script.innerHTML = `
//     try {
//         __adroll.record_user({"adroll_segments": "f98223a2"});
//     } catch(err) {}
// `;
// document.body.appendChild(script);

// return () => {
//     document.body.removeChild(script);
// };
