const id = i => document.getElementById(i);
const src = id("source");
const view = id("view");
const code = id("code");
const gutter = id("gutter")
const posEl = id("pos");

const escEl = document.createElement("span");
const esc = s => (escEl.textContent = s, escEl.innerHTML);

const errLines = new Set();
const tokCache = new Map();
let composing = false;

function render() {
	const lines = src.value.split("\n");

	for (let i = 0; i < lines.length; i++) {
		let h = tokCache.get(lines[i]);
		if (h === undefined) {
			h = scan(lines[i], true).map(t => t.type ? `<span class="tok-${t.type}">${esc(t.raw)}</span>` : esc(t.text)).join("");
			tokCache.set(lines[i], h);
			if (tokCache.size > 2048)
				tokCache.clear();
		}
		lines[i] = h;
	}

	let g = "";
	const n = lines.length;
	for (let i = 1; i <= n; i++)
		g += `<span${errLines.has(i)?' class="err"':""}>${i}</span>`+(i < n ? "<br>" : "");
	gutter.innerHTML = g;
	code.innerHTML = lines.map((h,i) => `<span class="ln${errLines.has(i+1)?"-err":""}">${h || " "}</span>`).join("\n");

	syncScroll();
}

function syncScroll() {
	view.scrollTop = src.scrollTop;
	view.scrollLeft = src.scrollLeft;
	gutter.scrollTop = src.scrollTop;
}
src.addEventListener("scroll", syncScroll, { passive: true });

function updateStatus() {
	const pos  = src.selectionStart;
	const upto = src.value.slice(0, pos);
	const line = upto.split("\n").length;
	const col  = pos - upto.lastIndexOf("\n");
	posEl.textContent = `Line ${line}, Column ${col}`;
}

src.addEventListener("input", () => {
	if (!composing)
		render();
	updateStatus();
});
src.addEventListener("keydown", e => {
	if (e.key === "Tab") {
		e.preventDefault();
		src.setRangeText("\t", src.selectionStart, src.selectionEnd, "end");
		updateStatus();
	} else if (e.ctrlKey && e.key === "Enter") {
		assemble();
	}
});
src.addEventListener("keyup", updateStatus);
src.addEventListener("click", updateStatus);

src.addEventListener("compositionstart", () => {
	composing = true;
	src.style.color = "var(--fg)";
});
src.addEventListener("compositionend", () => {
	composing = false;
	src.style.color = "";
	render();
});

src.value = `ldr r0, function
bx r0
function:
	.4byte 0x08137d25
`
render();