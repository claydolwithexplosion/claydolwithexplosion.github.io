let seed = 0x0n;
// I think we want 0x18 as offset

function next(state) {
	return (state * 1103515245n + 24691n) & 0xffffffffn;
}

function tid_sum(tid, sid) {
	return (tid & 0xffn)
		+ ((tid >> 8n) & 0xffn)
		+ (sid & 0xffn)
		+ ((sid >> 8n) & 0xffn);
}

function frames(start, end, sum) {
	let state = seed;
	let frames = [];
	for (let i = 0; i < start; i += 1) {
		state = next(state);
	}
	for (let i = start; i < end; i += 1) {
		state = next(state);
		if ((sum + (state >> 16n) & 0x7cn) == 0x18) {
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
	return frames;
}

function compute() {
	const offset = parseInt(document.getElementById("offset").value);
	const tid = BigInt(document.getElementById("tid").value);
	const start = parseInt(document.getElementById("battle_start").value);
	const end = parseInt(document.getElementById("battle_end").value);

	// Pre-initialize the RNG state
	let state = BigInt(tid);
	for (let i = 0; i < offset-1; i += 1) {
		state = next(state);
	}
	const sidm1 = state >> 16n;
	state = next(state);
	const sid = state >> 16n;
	state = next(state);
	const sidp1 = state >> 16n;
	
	let m1 = frames(start, end, tid_sum(tid, sidm1));
	let exact = frames(start, end, tid_sum(tid, sid));
	let p1 = frames(start, end, tid_sum(tid, sidp1));

	const output = document.getElementById("output");
	output.innerHTML = `
<h4>SID -1:</h4> ${m1.join(",")}
<h4 style="color: yellow">correct SID:</h4> <p style="color: yellow">${exact.join(",")}</p>
<h4>SID +1:</h4> ${p1.join(",")}`;
}