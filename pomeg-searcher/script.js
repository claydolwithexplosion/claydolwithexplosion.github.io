let seed = 0x0n;
// I think we want 0x18 as offset

function next(state) {
	return (state * 1103515245n + 24691n) & 0xffffffffn;
}

function compute() {
	const offset = parseInt(document.getElementById("offset").value);
	const tid = BigInt(document.getElementById("tid").value);
	let state = BigInt(tid);
	for (let i = 0; i < offset; i += 1) {
		state = next(state);
	}
	const sid = state >> 16n;
	const full_tid = tid | (sid << 16n);
	const tid_sum = (full_tid & 0xffn)
		+ ((full_tid >> 8n) & 0xffn)
		+ ((full_tid >> 16n) & 0xffn)
		+ ((full_tid >> 24n) & 0xffn);
	let frames = [];
	state = seed;
	for (let i = 0; i < 1000; i += 1) {
		state = next(state);
	}
	for (let i = 1000; i < 5000; i += 1) {
		state = next(state);
		if ((tid_sum + (state >> 16n) & 0x7cn) == 0x18) {
			frames.push(i);
		}
	}
	for (let i = 1; i < frames.length; i += 1) {
		if (frames[i-1] < frames[i]-1) {
			frames.splice(i-1, 1)
			i -= 1;
		} else {
			i += 1;
		}
	}
	console.log(tid, sid, tid_sum);
	console.log(frames.join());
}