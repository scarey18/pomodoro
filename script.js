const sessionDown = document.getElementById('session-down');
const sessionTime = document.getElementById('session-time');
const sessionUp = document.getElementById('session-up');
const breakDown = document.getElementById('break-down');
const breakTime = document.getElementById('break-time');
const breakUp = document.getElementById('break-up');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const timerLabel = document.getElementById('timer-label');
const timer = document.getElementById('timer');

let currentlyTicking = false;
let inSession = false;

function switchPlayAndPause() {
	currentlyTicking = !currentlyTicking;

	if (currentlyTicking) timeout = setTimeout(()=>tick(), 1000); 
	else clearTimeout(timeout);

	playBtn.classList.toggle('fa-pause');
	playBtn.classList.toggle('fa-play');
}
function tick() {
	let time = parseTimer();

	if (time == 0) switchClock();
	else timer.textContent = formatted(time);

	if (currentlyTicking) timeout = setTimeout(()=>tick(), 1000);
}
function parseTimer() {
	const clock = timer.textContent.split(':');
	if (clock.length == 3) {
		return parseInt(clock[0]*3600) + parseInt(clock[1]*60) + parseInt(clock[2]);
	}
	else if (clock.length == 2) {
		return parseInt(clock[0]*60) + parseInt(clock[1]);
	} else {
		return parseInt(clock[0]);
	}
}
function switchClock() {
	if (timerLabel.textContent == 'Session') {
		timerLabel.textContent = 'Break';
		timer.textContent = formatted(parseInt(breakTime.textContent)*60);
	} else {
		timerLabel.textContent = 'Session';
		timer.textContent = formatted(parseInt(sessionTime.textContent)*60);
	}
}
function formatted(time) {
	--time;
	let hours = null;
	let minutes = null;
	let seconds;
	if (time >= 3600) {
		hours = Math.floor(time / 3600);
		time %= 3600;
	}
	if (time >= 60) {
		minutes = Math.floor(time / 60);
		time %= 60;
	}
	seconds = time;

	if (hours) {
		return addZero(hours)+':'+addZero(minutes)+':'+addZero(seconds);
	} else if (minutes) {
		return addZero(minutes)+':'+addZero(seconds);
	} else {
		return addZero(seconds);
	}
}
function addZero(n) {
	return n < 10 ? "0" + n : n;
}
function setTimer(time) {
	let minutes = time%60 < 10 ? "0" + time%60 : time%60;

	if (time < 60) timer.textContent = `${time}:00`;
	else timer.textContent = `${Math.floor(time/60)}:${minutes}:00`;
}
function stopTimer() {
	inSession = false;
	currentlyTicking = false;
	clearTimeout(timeout);
	timerLabel.textContent = 'Session';
	playBtn.classList.remove('fa-pause');
	playBtn.classList.add('fa-play');
}


sessionDown.addEventListener('mousedown', (e) => {
	e.preventDefault();
	if (inSession) return;
	let time = parseInt(sessionTime.textContent);
	if (time == 1) return;
	sessionTime.textContent = time - 1;
	setTimer(time-1);
});

sessionUp.addEventListener('mousedown', (e) => {
	e.preventDefault();
	if (inSession) return;
	let time = parseInt(sessionTime.textContent);
	if (time == 480) return;
	sessionTime.textContent = time + 1;
	setTimer(time+1);
});

breakDown.addEventListener('mousedown', (e) => {
	e.preventDefault();
	if (inSession) return;
	let time = parseInt(breakTime.textContent);
	if (time == 1) return;
	breakTime.textContent = time - 1;
});

breakUp.addEventListener('mousedown', (e) => {
	e.preventDefault();
	if (inSession) return;
	let time = parseInt(breakTime.textContent);
	if (time == 60) return;
	breakTime.textContent = time + 1;
});

playBtn.addEventListener('mousedown', (e) => {
	e.preventDefault();
	inSession = true;
	switchPlayAndPause();
});

stopBtn.addEventListener('mousedown', (e) => {
	e.preventDefault();
	stopTimer();
	setTimer(parseInt(sessionTime.textContent));
});

resetBtn.addEventListener('mousedown', (e) => {
	e.preventDefault();
	stopTimer();
	setTimer(25);
	sessionTime.textContent = 25;
	breakTime.textContent = 5;
});