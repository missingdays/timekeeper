
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const f = Math.floor;

export function formatTime(ms){
	let h = normalize(ms/hour);
	let m = normalize(ms/minute);
	let s = normalize(ms/second);
	return `${h}:${m}:${s}`;
}

export function objectTime(options){

	let ms = 0;

	if(options.ms){
		ms = options.ms;
	}

	if(options.seconds){
		ms = options.seconds * second;
	}

	return {
		ms: ms,
		seconds: normalize(ms / second),
		minutes: normalize(ms / minute),
		hours: normalize(ms / hour), 
		days: f(ms / day)
	};
}

function normalize(t){
	t = f(t) % 60;

	if(t < 10){
		return "0" + t;
	} else {
		return t;
	}
}