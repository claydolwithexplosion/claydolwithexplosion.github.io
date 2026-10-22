

/* ================ SCANNING ================ */
/* I was lazy and just used a regex-based approach */

const regices = [
	// Whitespaces
	["^[ \t\r]+", {type:"whitespace",ignore:true}],
	["^\n", {type:"whitespace",newline:true,ignore:true}],
	["^[;@].*?\n", {type:"comment",newline:true,ignore:true}],

	// Literals
	["^#?0b([01]+)", {type:"int_literal",kind:"bin_literal"}],
	["^#?0o([0-8]+)", {type:"int_literal",kind:"oct_literal"}],
	["^#?0x([0-9A-Fa-f]+)", {type:"int_literal",kind:"hex_literal"}],
	["^#([+-]0x[0-9A-Fa-f]+)", {type:"int_literal",kind:"hex_literal"}],
	["^#?([0-9]+)", {type:"int_literal",kind:"dec_literal"}],
	["^#([+-][0-9]+)", {type:"int_literal",kind:"dec_literal"}],

	// Registers
	["^r10", {type:"register",val:10}],
	["^r11", {type:"register",val:11}],
	["^r12", {type:"register",val:12}],
	["^r13", {type:"register",val:13}],
	["^r14", {type:"register",val:14}],
	["^r15", {type:"register",val:15}],
	["^r0", {type:"register",val:0}],
	["^r1", {type:"register",val:1}],
	["^r2", {type:"register",val:2}],
	["^r3", {type:"register",val:3}],
	["^r4", {type:"register",val:4}],
	["^r5", {type:"register",val:5}],
	["^r6", {type:"register",val:6}],
	["^r7", {type:"register",val:7}],
	["^r8", {type:"register",val:8}],
	["^r9", {type:"register",val:9}],
	["^ip", {type:"register",val:12}],
	["^sp", {type:"register",val:13}],
	["^lr", {type:"register",val:14}],
	["^pc", {type:"register",val:15}],

	// Operators
	["^\\?", {type:"operator",kind:"sel"}],
	["^\\+", {type:"operator",kind:"add"}],
	["^\\-", {type:"operator",kind:"sub"}],
	["^\\*", {type:"operator",kind:"mul"}],
	["^\\/", {type:"operator",kind:"div"}],
	["^\\%", {type:"operator",kind:"mod"}],
	["^\\&", {type:"operator",kind:"and"}],
	["^\\|", {type:"operator",kind:"or"}],
	["^\\^", {type:"operator",kind:"xor"}],
	["^\\<\\<", {type:"operator",kind:"lsl"}],
	["^\\>\\>", {type:"operator",kind:"lsr"}],
	["^\\>\\>\\-", {type:"operator",kind:"asr"}],
	["^\\>\\>\\>", {type:"operator",kind:"ror"}],
	["^\\<\\=", {type:"operator",kind:"le"}],
	["^\\<", {type:"operator",kind:"lt"}],
	["^\\>\\=", {type:"operator",kind:"ge"}],
	["^\\>", {type:"operator",kind:"gt"}],
	["^\\=\\=", {type:"operator",kind:"eq"}],
	["^\\!\\=", {type:"operator",kind:"neq"}],
	["^\\!", {type:"operator",kind:"not"}],

	// Symbols
	["^\\:", {type:"symbol",kind:"colon"}],
	["^\\,", {type:"symbol",kind:"comma"}],
	["^\\(", {type:"symbol",kind:"lparen"}],
	["^\\)", {type:"symbol",kind:"rparen"}],
	["^\\[", {type:"symbol",kind:"lbrack"}],
	["^\\]", {type:"symbol",kind:"rbrack"}],
	["^\\{", {type:"symbol",kind:"lbrace"}],
	["^\\}", {type:"symbol",kind:"rbrace"}],

	// Shifts
	["^lsls?", {type:"mnemonic",kind:"lsls"}],
	["^lsrs?", {type:"mnemonic",kind:"lsrs"}],
	["^asrs?", {type:"mnemonic",kind:"asrs"}],

	// Immediate and 3-register data processing
	["^adds?", {type:"mnemonic",kind:"adds"}],
	["^subs?", {type:"mnemonic",kind:"subs"}],
	["^movs?", {type:"mnemonic",kind:"movs"}],
	["^cmp", {type:"mnemonic",kind:"cmp"}],

	// 2-register Data processing
	["^adcs?", {type:"mnemonic",kind:"adcs"}],
	["^sbcs?", {type:"mnemonic",kind:"sbcs"}],
	["^bics?", {type:"mnemonic",kind:"bics"}],
	["^ands?", {type:"mnemonic",kind:"ands"}],
	["^orrs?", {type:"mnemonic",kind:"orrs"}],
	["^eors?", {type:"mnemonic",kind:"eors"}],
	["^xors?", {type:"mnemonic",kind:"eors"}],
	["^negs?", {type:"mnemonic",kind:"negs"}],
	["^rsbs?", {type:"mnemonic",kind:"negs"}],
	["^mvns?", {type:"mnemonic",kind:"mvns"}],
	["^cmn", {type:"mnemonic",kind:"cmn"}],
	["^tst", {type:"mnemonic",kind:"tst"}],
	["^muls?", {type:"mnemonic",kind:"muls"}],
	["^rors?", {type:"mnemonic",kind:"rors"}],

	// Memory
	["^ldrsh", {type:"mnemonic",kind:"ldrsh"}],
	["^ldrsb", {type:"mnemonic",kind:"ldrsb"}],
	["^strb", {type:"mnemonic",kind:"strb"}],
	["^ldrb", {type:"mnemonic",kind:"ldrb"}],
	["^strh", {type:"mnemonic",kind:"strh"}],
	["^ldrh", {type:"mnemonic",kind:"ldrh"}],
	["^str", {type:"mnemonic",kind:"str"}],
	["^ldr", {type:"mnemonic",kind:"ldr"}],

	// Special
	["^adr", {type:"mnemonic",kind:"adr"}],

	["^push", {type:"mnemonic",kind:"push"}],
	["^pop", {type:"mnemonic",kind:"pop"}],
	["^stmia", {type:"mnemonic",kind:"stm"}],
	["^ldmia", {type:"mnemonic",kind:"ldm"}],
	["^stm", {type:"mnemonic",kind:"stm"}],
	["^ldm", {type:"mnemonic",kind:"ldm"}],

	["^swi", {type:"mnemonic",kind:"svc"}],
	["^svc", {type:"mnemonic",kind:"svc"}],

	// Branches
	["^beq", {type:"mnemonic",kind:"bcond",val:0}],
	["^bne", {type:"mnemonic",kind:"bcond",val:1}],
	["^bcs", {type:"mnemonic",kind:"bcond",val:2}],
	["^bhs", {type:"mnemonic",kind:"bcond",val:2}],
	["^bcc", {type:"mnemonic",kind:"bcond",val:3}],
	["^blo", {type:"mnemonic",kind:"bcond",val:3}],
	["^bmi", {type:"mnemonic",kind:"bcond",val:4}],
	["^bpl", {type:"mnemonic",kind:"bcond",val:5}],
	["^bvs", {type:"mnemonic",kind:"bcond",val:6}],
	["^bvc", {type:"mnemonic",kind:"bcond",val:7}],
	["^bhi", {type:"mnemonic",kind:"bcond",val:8}],
	["^bls", {type:"mnemonic",kind:"bcond",val:9}],
	["^bge", {type:"mnemonic",kind:"bcond",val:10}],
	["^blt", {type:"mnemonic",kind:"bcond",val:11}],
	["^bgt", {type:"mnemonic",kind:"bcond",val:12}],
	["^ble", {type:"mnemonic",kind:"bcond",val:13}],
	["^bal", {type:"mnemonic",kind:"bcond",val:14}],
	["^b", {type:"mnemonic",kind:"b"}],

	// Raw bytes
	["^raw1", {type:"mnemonic",kind:"raw",val:1}],
	["^raw2", {type:"mnemonic",kind:"raw",val:2}],
	["^raw4", {type:"mnemonic",kind:"raw",val:4}],

	["^.byte", {type:"mnemonic",kind:"raw",val:1}],
	["^.short", {type:"mnemonic",kind:"raw",val:2}],
	["^.halfword", {type:"mnemonic",kind:"raw",val:2}],
	["^.word", {type:"mnemonic",kind:"raw",val:4}],

	["^.1byte", {type:"mnemonic",kind:"raw",val:1}],
	["^.2byte", {type:"mnemonic",kind:"raw",val:2}],
	["^.4byte", {type:"mnemonic",kind:"raw",val:4}],

	// Identifiers and unknown characters
	["^[A-Za-z_][A-Za-z_0-9]*", {type:"identifier"}],
	["^.", {type:"unknown"}],
]

function scan(raw) {
	let tokens = [];
	let copy = raw;
	let line = 1;
	while (copy.length > 0) {
		for (const exp of regices) {
			// Originally I thought all regexes kept state
			// so I made a new regex each time.
			// It'd probably be a lot more efficient to
			// have the regexes inside the array though.
			const fresh = new RegExp(exp[0],"i");
			if (fresh.test(copy)) {
				let tk = {...exp[1]};
				tk.line = line;
				tk.match = fresh.exec(copy).pop();
				copy = copy.replace(fresh, "");
				if ("newline" in tk && tk.newline) {
					line += 1;
				}
				if ("ignore" in tk && tk.ignore) {
					break;
				}
				tokens.push(tk);
				break;
			}
		}
	}
	return tokens;
}






/* ================ PARSING ================ */
/* Just a simple recursive-descent parser */

function parse_basic(tokens,errors) {
	let tk = tokens[0];
	if (tk === undefined) {
		return null;
	}
	switch (tk.type) {
		default:
			return null;
		case "register":
			tokens.shift();
			return {kind:"register",type:"reg",val:tk.val,token:tk};
		case "identifier":
			tokens.shift();
			return {kind:"identifier",type:"any",name:tk.match,token:tk};
		case "int_literal":
			tokens.shift();
			let val
			switch (tk.kind) {
				case "bin_literal":
					val = parseInt(tk.match, 2);
					break;
				case "oct_literal":
					val = parseInt(tk.match, 8);
					break;
				case "hex_literal":
					val = parseInt(tk.match, 16);
					break;
				case "dec_literal":
					val = parseInt(tk.match, 10);
				default:
					break;
			}
			return {kind:"integer",type:"int",val:val,token:tk};
		case "symbol":
			if (tk.kind == "lparen") {
				tokens.shift();
				const node = parse_expr(tokens,errors);
				tk = tokens[0];
				if (tk.type == "symbol" && tk.kind == "rparen") {
					tokens.shift();
				} else {
					errors.push({type:"warning",kind:"unclosed parentheses"});
				}
				return node;
			}
			return null;
		case "unknown":
			errors.push({type:"warning",kind:"unknown character",token:tk});
			tokens.shift();
			return parse_basic(tokens,errors);
	}
	return null;
}

function parse_unary(tokens,errors) {
	let tk = tokens[0];
	if (tk && tk.type == "operator" && ["add","sub","not"].includes(tk.kind)) {
		tokens.shift();
		let child = parse_unary(tokens,errors);
		return {kind:"unary",type:child.type,operator:tk.kind,child:child,token:tk};
	} else {
		return parse_basic(tokens,errors);
	}
}

function parse_shifts(tokens,errors) {
	let node = parse_unary(tokens,errors);
	if (node && node.type == "reg") {
		return node;
	}
	let tk = tokens[0];
	while (tk && tk.type == "operator" && ["lsl","lsr","asr","ror"].includes(tk.kind)) {
		tokens.shift();
		const right = parse_unary(tokens,errors);
		if (!right) {
			errors.push({type:"error",kind:"expected value after shift",token:tk});
		} else if (right.type == "reg") {
			errors.push({type:"error",kind:"can't use register as shift operand"});
		}
		node = {kind:"shift",type:"int",operator:tk.kind,left:node,right:right,token:tk};
		tk = tokens[0];
	}
	return node;
}

function parse_bits(tokens,errors) {
	let node = parse_shifts(tokens,errors);
	if (node && node.type == "reg") {
		return node;
	}
	let tk = tokens[0];
	while (tk && tk.type == "operator" && ["and","or","xor"].includes(tk.kind)) {
		tokens.shift();
		const right = parse_shifts(tokens,errors);
		if (!right) {
			errors.push({type:"error",kind:"expected value after bitwise operator",token:tk});
		} else if (right.type == "reg") {
			errors.push({type:"error",kind:"can't use register as bitwise operand"});
		}
		node = {kind:"bits",type:"int",operator:tk.kind,left:node,right:right,token:tk};
		tk = tokens[0];
	}
	return node;
}

function parse_prod(tokens,errors) {
	let node = parse_bits(tokens,errors);
	if (node && node.type == "reg") {
		return node;
	}
	let tk = tokens[0];
	while (tk && tk.type == "operator" && ["mul","div","mod"].includes(tk.kind)) {
		tokens.shift();
		const right = parse_bits(tokens,errors);
		if (!right) {
			errors.push({type:"error",kind:"expected value after product operator",token:tk});
		} else if (right.type == "reg") {
			errors.push({type:"error",kind:"can't use register as product operand"});
		}
		node = {kind:"prod",type:"int",operator:tk.kind,left:node,right:right,token:tk};
		tk = tokens[0];
	}
	return node;
}

function parse_sum(tokens,errors) {
	let node = parse_prod(tokens,errors);
	if (node && node.type == "reg") {
		return node;
	}
	let tk = tokens[0];
	while (tk && tk.type == "operator" && ["add","sub"].includes(tk.kind)) {
		tokens.shift();
		const right = parse_prod(tokens,errors);
		if (!right) {
			errors.push({type:"error",kind:"expected value after addition/subtraction operator",token:tk});
		} else if (right.type == "reg") {
			errors.push({type:"error",kind:"can't use register as addition/subtraction operand"});
		}
		node = {kind:"sum",type:"int",operator:tk.kind,left:node,right:right,token:tk};
		tk = tokens[0];
	}
	return node;
}

function parse_cmp(tokens,errors) {
	let node = parse_sum(tokens,errors);
	let tk = tokens[0];
	if (node && node.type == "reg") {
		return node;
	}
	while (tk && tk.type == "operator" && ["lt","gt","le","ge","eq","neq"].includes(tk.kind)) {
		tokens.shift();
		const right = parse_sum(tokens,errors);
		if (!right) {
			errors.push({type:"error",kind:"expected value after comparison operator",token:tk});
		} else if (right.type == "reg") {
			errors.push({type:"error",kind:"can't use register for comparison",token:tk});
		}
		node = {kind:"cmp",type:"int",operator:tk.kind,left:node,right:right,token:tk};
		tk = tokens[0];
	}
	return node;
}

function parse_sel(tokens,errors) {
	let node = parse_cmp(tokens,errors);
	if (node && node.type == "reg") {
		return node;
	}
	let tk = tokens[0];
	if (tk && tk.type == "operator" && tk.kind == "sel") {
		tokens.shift();
		const origin = tk;
		let sel1,sel2;
		sel1 = parse_top(tokens,errors);
		tk = tokens[0];
		if (tk && tk.type == "symbol" && tk.kind == "colon") {
			tokens.shift();
			sel2 = parse_top(tokens,errors);
		} else {
			errors.push({type:"error",kind:"couldn't find ':' after selection operator",token:tk});
		}
		if (sel1 && sel2 && sel1.type != sel2.type && sel1.type != "any" && sel2.type != "any") {
			errors.push({type:"error",kind:"mismatched types of selection operator",token:origin});
		}
		node = {kind:"sel",type:sel1.type,operator:"sel",cond:node,left:sel1,right:sel2,token:origin};
	}
	return node;
}

function parse_expr(tokens,errors) {
	return parse_sel(tokens,errors);
}

function parse_3op_dpc_instr(tokens,errors) {
	const origin = tokens.shift();
	let rd,rn,rm;
	let form;

	rd = parse_expr(tokens,errors);
	if (!rd) {
		errors.push({type:"error",kind:`couldn't find rd for ${origin.kind} instruction`,token:origin});
	} else if (rd.type != "reg") {
		errors.push({type:"error",kind:"expected rd to be a register",token:origin});
	}
	let tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected comma before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "comma") {
		errors.push({type:"warning",kind:"expected comma after rd",token:origin});
		tokens.unshift(tk);
	}

	rn = parse_expr(tokens,errors);
	if (!rn) {
		errors.push({type:"error",kind:"couldn't find rn/immediate",token:origin});
	} else if (rn.type == "int") {
		// Implicit rn = rd
		rm = rn;
		rn = rd;
		form = "immediate";
	} else if (rn.type == "reg") {
		// Look for the optional operand
		tk = tokens.shift();
		if (tk && (tk.type != "symbol" || tk.kind != "comma")) {
			// Didn't find comma, so we have 2 registers as operands
			rm = rn;
			rn = rd;
			form = "register";
			tokens.unshift(tk);
		} else {
			// Main 3-operand form
			rm = parse_expr(tokens,errors);
			if (!rm) {
				errors.push({type:"error",kind:"couldn't find third operand",token:origin});
			} else if (rm.type == "reg") {
				form = "register";
			} else if (rm.type == "int") {
				form = "immediate";
			}
		}
	} else {
		errors.push({type:"error",kind:"found invalid rn/immediate/shift",token:origin});
	}
	return {kind:origin.kind,type:"instr",rd:rd,rn:rn,rm:rm,form:form,token:origin};
}

function parse_2op_dpc_instr(tokens,errors) {
	const origin = tokens.shift();
	let rd,rm;
	let form;

	rd = parse_expr(tokens,errors);
	if (!rd) {
		errors.push({type:"error",kind:`couldn't find rd for ${origin.kind} instruction`,token:origin});
	} else if (rd.type != "reg") {
		errors.push({type:"error",kind:"expected rd to be a register",token:origin});
	}
	let tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected comma before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "comma") {
		errors.push({type:"warning",kind:"expected comma after rd",token:origin});
		tokens.unshift(tk);
	}

	rm = parse_expr(tokens,errors);
	if (!rm) {
		errors.push({type:"error",kind:"couldn't find rn/immediate",token:origin});
	} else if (rm.type == "int") {
		form = "immediate";
	} else if (rm.type == "reg") {
		form = "register";
	} else {
		errors.push({type:"error",kind:"found invalid rn/immediate",token:origin});
	}
	return {kind:origin.kind,type:"instr",rd:rd,rn:rd,rm:rm,form:form,token:origin};
}

function parse_2reg_dpc_instr(tokens,errors) {
	const origin = tokens.shift();
	let rd,rn;

	rd = parse_expr(tokens,errors);
	if (!rd) {
		errors.push({type:"error",kind:`couldn't find rd for ${origin.kind} instruction`,token:origin});
	} else if (rd.type != "reg") {
		errors.push({type:"error",kind:"expected rd to be a register",token:origin});
	}
	let tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected comma before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "comma") {
		errors.push({type:"warning",kind:"expected comma after rd",token:origin});
		tokens.unshift(tk);
	}

	rm = parse_expr(tokens,errors);
	if (!rm) {
		errors.push({type:"error",kind:"couldn't find rn/immediate",token:origin});
	} else if (rm.type == "int") {
		errors.push({type:"error",kind:`integer form not supported for ${origin.kind} instruction`,token:origin});
	} else if (rm.type != "reg") {
		errors.push({type:"error",kind:"found invalid rn/immediate",token:origin});
	}
	return {kind:origin.kind,type:"instr",rd:rd,rn:rd,rm:rm,token:origin};
}

function parse_mem_instr(tokens,errors) {
	const origin = tokens.shift();
	let form;

	let rd = parse_expr(tokens,errors);
	if (!rd) {
		errors.push({type:"error",kind:`couldn't find rd for ${origin.kind} instruction`,token:origin});
	} else if (rd.type != "reg") {
		errors.push({type:"error",kind:"expected rd to be a register",token:origin});
	}
	let tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected comma before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "comma") {
		errors.push({type:"warning",kind:"expected comma after rd",token:origin});
		tokens.unshift(tk);
	}
	tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected bracket before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "lbrack") {
		errors.push({type:"warning",kind:"expected bracket after rd",token:origin});
		tokens.unshift(tk);
	}

	let rn = parse_expr(tokens,errors);
	if (!rn) {
		errors.push({type:"error",kind:"couldn't find rn",token:origin});
	} else if (rn.type != "reg") {
		errors.push({type:"error",kind:"found invalid rn",token:origin});
	}

	tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected comma before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "comma") {
		errors.push({type:"warning",kind:"expected comma after rd",token:origin});
		tokens.unshift(tk);
	}

	let rm = parse_expr(tokens,errors);
	if (!rm) {
		errors.push({type:"error",kind:"couldn't find third operand",token:origin});
	} else if (rm.type == "reg") {
		form = "register";
	} else if (rm.type == "int") {
		form = "immediate";
	}

	tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected bracket before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "rbrack") {
		errors.push({type:"warning",kind:"expected bracket after third operand",token:origin});
		tokens.unshift(tk);
	}

	return {kind:origin.kind,type:"instr",rd:rd,rn:rn,rm:rm,form:form,token:origin};
}

function parse_reg_list(tokens,errors) {
	let list = [];

	let tk = tokens.shift();
	if (!tk) {
		errors.push({type:"error",kind:"expected brace before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "lbrace") {
		errors.push({type:"warning",kind:"expected brace after rd",token:origin});
		tokens.unshift(tk);
	}
	let el;
	while (el = parse_basic(tokens,errors)) {
		if (el.type != "reg") {
			errors.push({type:"error",kind:"non-register in register list",token:origin});
		}
		tk = tokens.shift();
		if (tk && tk.type == "operator" && tk.kind == "sub") {
			let el2 = parse_basic(tokens,errors);
			if (!el2 || !["reg","any"].includes(el2.type)) {
				errors.push({type:"error",kind:"invalid register range",token:origin});
			} else {
				list.push({kind:"range",left:el,right:el2});
			}
			tk = tokens.shift();
		} else {
			list.push({kind:"single",child:el});
		}
		if (!tk || tk.type != "symbol" || tk.kind != "comma") {
			tokens.unshift(tk);
			if (tk && tk.type == "symbol" && tk.kind == "rbrace") {
				continue;
			} else {
				errors.push({type:"warning",kind:"expected comma after register in register list",token:origin});
			}
		}
	}
	tk = tokens.shift();
	if (!tk) {
		errors.push({type:"warning",kind:"expected brace before end of file",token:origin});
	} else if (tk.type != "symbol" || tk.kind != "rbrace") {
		errors.push({type:"warning",kind:"expected brace after register list",token:origin});
		tokens.unshift(tk);
	}
	return list;
}

function parse_multi_mem_instr(tokens,errors) {
	const origin = tokens.shift();
	let rd;

	rn = parse_expr(tokens,errors);
	if (!rn) {
		errors.push({type:"error",kind:`couldn't find rn for ${origin.kind} instruction`,token:origin});
	} else if (rn.type != "reg") {
		errors.push({type:"error",kind:"expected rn to be a register",token:origin});
	}
	
	let list = parse_reg_list(tokens,errors);

	return {kind:origin.kind,type:"instr",rn:rn,list:list,token:origin};
}

function parse_multi_stack_instr(tokens,errors) {
	const origin = tokens.shift();

	let list = parse_reg_list(tokens,errors);

	return {kind:origin.kind,type:"instr",rn:13,list:list,token:origin};
}

function parse_raw_instr(tokens,errors) {
	const origin = tokens.shift();
	let values = [];
	let value

	while (value = parse_expr(tokens,errors)) {
		if (value.type != "int") {
			errors.push({type:"error",kind:"can only have raw immediates",token:origin});
		}
		values.push(value);
		let tk = tokens[0];
		if (tk && (tk.type != "symbol" || tk.kind != "comma")) {
			break;
		}
	}

	return {kind:origin.kind,type:"instr",size:origin.val,values:values,token:origin};
}

function parse_instr(tokens,errors) {
	const tk = tokens[0];
	if (!tk) {
		return null;
	}
	switch (tk.type) {
		default:
			let node = parse_expr(tokens,errors);
			if (node && node.type != "instr") {
				errors.push({type:"error",kind:"expression where instruction was expected",token:tk});
				return parse_instr(tokens,errors);
			} else {
				return node;
			}
		case "mnemonic":
			switch (tk.kind) {
				default:
					return null;
				case "lsls":
				case "lsrs":
				case "asrs":
				case "adds":
				case "subs":
					return parse_3op_dpc_instr(tokens,errors);
				case "movs":
				case "cmp":
					return parse_2op_dpc_instr(tokens,errors);
				case "adcs":
				case "sbcs":
				case "ands":
				case "orrs":
				case "bics":
				case "eors":
				case "cmn":
				case "tst":
				case "mvns":
				case "negs":
				case "rors":
				case "muls":
					return parse_2reg_dpc_instr(tokens,errors);
				case "str":
				case "ldr":
				case "strb":
				case "ldrb":
				case "strh":
				case "ldrh":
				case "ldrsb":
				case "ldrsh":
					return parse_mem_instr(tokens,errors);
				case "push":
				case "pop":
					return parse_multi_stack_instr(tokens,errors);
				case "stm":
				case "ldm":
					return parse_multi_mem_instr(tokens,errors);
				case "raw":
					return parse_raw_instr(tokens,errors);
			}
	}
}

function parse_top(tokens,errors) {
	return parse_instr(tokens,errors);
}

function parse(tokens) {
	let node = {type:"root",children:[]};
	let errors = [];
	let child;
	while ((child = parse_top(tokens,errors)) !== null) {
		node.children.push(child);
	}
	for (const err of errors) {
		console.log(err);
	}
	return node;
}





/* ================ EMITTING ================ */
/* Just walk the tree and emit stuff I think */
/* Later I'll probably wanna do natural alignment */

function emit(tree,errors) {
	if (!tree) {
		errors.push({type:"warning",kind:"Trying to emit undefined value",token:null});
		return 0;
	}
	const tk = tree.token;
	switch (tree.type) {
		case "root":
			let children = [];
			for (let child of tree.children) {
				let processed_child = emit(child,errors);
				if (processed_child && Array.isArray(processed_child)) {
					children = children.concat(processed_child);
				}
			}
			return children;
		case "instr":
			if (tree.kind && tree.kind == "sel") {
				if (emit(tree.cond)) {
					return emit(tree.left);
				} else {
					return emit(tree.right);
				}
			}
			let op1;
			let op2;
			let rd = emit(tree.rd,errors);
			let rn = emit(tree.rn,errors);
			let rm = emit(tree.rm,errors);
			switch (tree.kind) {
				default:
					break;
				case "lsls":
				case "lsrs":
				case "asrs":
					switch (tree.kind) {
						case "lsls":
							op1 = 0b00;
							op2 = 0b0010;
							break;
						case "lsrs":
							op1 = 0b01;
							op2 = 0b0011;
							break;
						case "asrs":
							op1 = 0b10;
							op2 = 0b0100;
							break;
					}
					if (tree.form == "immediate") {
						return [{size:2,val:((0b000 << 13) | (op1 << 11) | (rm << 6) | (rn << 3) | (rd << 0))}];
					} else if (tree.form == "register") {
						if (rd != rn && rn != rm && rm != rd) {
							errors.push({type:"error",kind:"Can't have three different registers with shift instruction",token:tk});
							return [];
						}
						return [{size:2,val:((0b010000 << 10) | (op2 << 6) | (rn << 3) | (rd << 0))}];
					} else {
						errors.push({type:"error",kind:"Invalid form of shift",token:tk});
						return [];
					}
				case "raw":
					let values = [];
					for (let val of tree.values) {
						values.push({size:tree.size,val:val.val});
					}
					return values;
				case "adds":
					if (tree.form == "immediate") {
						if (rn == 15) {
							// Adr form
							if (rm & 3) {
								errors.push({type:"warning",kind:"Add Rd, PC, #imm form doesn't support non-4-byte-aligned immediates",token:tk});
							}
							if (rd >= 8) {
								errors.push({type:"error",kind:"Can't use a high register for Add Rd, PC, #imm form",token:tk});
								return [];
							}
							return [{size:2,val:(0xa000 | (rd << 8) | (rm >> 2))}];
						}
						if (rn == 13 && rd != 13) {
							if (rm & 3) {
								errors.push({type:"warning",kind:"Add Rd, SP, #imm form doesn't support non-4-byte-aligned immediates",token:tk});
							}
							if (rd >= 8) {
								errors.push({type:"error",kind:"Can't use a high register for Add Rd, SP, #imm form",token:tk});
								return [];
							}
							return [{size:2,val:(0xa800 | (rd << 8) | (rm >> 2))}];
						}
					}
					else if (tree.form == "register") {
						if (rd >= 8 || rn >= 8) {
							if (rn != rm) {
								errors.push({type:"error",kind:"Can't have three different registers with high add",token:tk});
								return [];
							}
							return [{size:2,val:(0x4400 | ((rd & 8) << 3) | ((rn & 8) << 4) | (rd & 7) | ((rn & 7) << 3))}];
						}
					}
				case "subs":
					if (tree.form == "immediate") {
						if (rd == 13) {
							if (rm & 3) {
								errors.push({type:"warning",kind:"Stack adjustment instructions don't support non-4-byte-aligned immediates",token:tk});
							}
							if (rn != 13) {
								errors.push({type:"error",kind:"Can't have Rn != 13 in stack adjustment instruction",token:tk});
								return [];
							}
							return [{size:2,val:(0xb000 | (tree.kind == "adds" ? 0x00 : 0x80) | (rm >> 2))}]
						} else if (rd == rn) {
							// 8-bit immediate form, implicitly preferred over 3-bit form
							if (rm > 0xff) {
								errors.push({type:"warning",kind:"ADDS and SUBS only support 8-bit immediates at max",token:tk});
							}
							if (rd >= 8) {
								errors.push({type:"error",kind:"ADDS and SUBS with immediate forms don't allow high registers",token:tk});
								return [];
							}
							return [{size:2,val:(0x3000 | (tree.kind == "adds" ? 0x000 : 0x800) | (rm & 0xff))}];
						} else if (rm <= 7) {
							if (rm < 0) {
								if (rm >= -7) {
									if (tree.kind == "adds") {
										tree.kind = "subs";
									} else if (tree.kind == "subs") {
										tree.kind = "adds";
									}
								} else {
									errors.push({type:"error",kind:"Can't have immediates > 7 for ADDS and SUBS with Rd != Rn",token:tk});
									return [];
								}
							}
							return [{size:2,val:(0x1c00 | (tree.kind == "adds" ? 0x000 : 0x200) | (rm << 6) | (rn << 3) | (rd << 0))}];
						} else {
							errors.push({type:"error",kind:"Can't have immediates > 7 for ADDS and SUBS with Rd != Rn",token:tk});
							return [];
						}
					} else if (tree.form == "register")  {
						if (rd >= 8 || rn >= 8 || rm >= 8) {
							errors.push({type:"error",kind:"Can't have high registers for three-register ADDS/SUBS",token:tk});
							return [];
						}
						return [{size:2,val:(0x1800 | (tree.kind == "adds" ? 0x000 : 0x200) | (rm << 6) | (rn << 3) | (rd << 0))}];
					} else {
						// Illegal form
						errors.push({type:"error",kind:"What even happened here?",token:tk});
						return [];
					}
				case "movs":
				case "cmp":
					if (tree.form == "immediate") {
						if (rd >= 8) {
							errors.push({type:"error",kind:"Can't use immediate MOVS/CMP with high registers",token:tk});
							return [];
						} else if (rn > 0xff) {
							errors.push({type:"error",kind:"Can't have immediates with more than 8 bits",token:tk});
							return [];
						}
						return [{size:2,val:(0x2000 | (tree.kind == "movs" ? 0x000 : 0x800) | (rd << 8) | (rn << 0))}];
					} else if (tree.form == "register" && (rd >= 8 || rn >= 8)) {
						return [{size:2,val:(0x4000 | (tree.kind == "movs" ? 0x600 : 0x500) | ((rd & 8) << 4) | (rn << 3) | ((rd & 7) << 3))}]
					}
				case "adcs":
				case "sbcs":
				case "ands":
				case "orrs":
				case "bics":
				case "eors":
				case "cmn":
				case "tst":
				case "mvns":
				case "negs":
				case "rors":
				case "muls":
					if (tree.form == "immediate") {
						errors.push({type:"error",kind:"Can't use immediate form with most data processing instructions",token:tk});
						return [];
					} else if (rd >= 8 || rn >= 8) {
						errors.push({type:"error",kind:"Can't use high registers with most data processing instructions",token:tk});
						return [];
					} else if (rd != rn && rn != rm && rm != rd) {
						errors.push({type:"error",kind:"Can't use three separate registers with most data processing instructions",token:tk});
						return [];
					}
					switch (tree.kind) {
						case "adcs":
							op2 = 0b0101;
							break;
						case "sbcs":
							op2 = 0b0110;
							break;
						case "ands":
							op2 = 0b0000;
							break;
						case "orrs":
							op2 = 0b1100;
							break;
						case "bics":
							op2 = 0b1110;
							break;
						case "eors":
							op2 = 0b0001;
							break;
						case "cmn":
							op2 = 0b1011;
							break;
						case "tst":
							op2 = 0b1000;
							break;
						case "mvns":
							op2 = 0b1111;
							break;
						case "negs":
							op2 = 0b1001;
							break;
						case "rors":
							op2 = 0b0111;
							break;
						case "muls":
							op2 = 0b1101;
							break;
						case "cmp":
							op2 = 0b1010;
							break;
					}
					return [{size:2,val:(0x4000 | (op2 << 6) | (rm << 3) | (rd << 0))}]
				case "ldrsb":
				case "ldrsh":
					if (tree.form == "immediate") {
						errors.push({type:"error",kind:"Signed loads don't have an immediate form",token:tk});
						return [];
					}
				case "ldr":
				case "ldrb":
				case "ldrh":
				case "str":
				case "strb":
				case "strh":
					if (tree.form == "immediate") {
						if (rn == 15) {
							if (tree.kind != "ldr") {
								errors.push({type:"warning",kind:"Can only do 4 byte PC-relative loads",token:tk});
							}
							if (rm & 3) {
								errors.push({type:"warning",kind:"Can't encode misaligned PC-relative loads",token:tk});
							}
							rm = Math.floor(rm / 4);
							if (rm >= 256) {
								errors.push({type:"error",kind:"PC-relative loads only go up to +1020",token:tk});
								return [];
							}
							if (rd >= 8) {
								errors.push({type:"error",kind:"Can't do PC-relative loads into a high register",token:tk});
								return [];
							}
							return [{size:2,val:(0x4800 | (rd << 8) | (rm << 0))}];
						}
						if (rn == 13) {
							switch (tree.kind) {
								case "ldr":
									op1 = 0b1;
									break;
								case "str":
									op1 = 0b0;
									break;
								default:
									errors.push({type:"error",kind:"Can only do full 4 byte SP-relative loads/stores",token:tk});
									return [];
							}
							if (rm & 3) {
								errors.push({type:"warning",kind:"Can't encode misaligned SP-relative loads",token:tk});
							}
							rm = Math.floor(rm / 4);
							if (rm >= 256) {
								errors.push({type:"error",kind:"SP-relative loads/stores only go up to +1020",token:tk});
								return [];
							}
							if (rd >= 8) {
								errors.push({type:"error",kind:"Can't do SP-relative loads/stores into a high register",token:tk});
								return [];
							}
							return [{size:2,val:(0x9000 | (op1 << 11) | (rd << 8) | (rm << 0))}];
						}
						switch (tree.kind) {
							case "ldr":
								op1 = 4;
								op2 = 0b01;
								break;
							case "str":
								op1 = 4;
								op2 = 0b00;
								break;
							case "ldrb":
								op1 = 1;
								op2 = 0b11;
								break;
							case "strb":
								op1 = 1;
								op2 = 0b10;
								break;
							case "ldrh":
								op1 = 2;
								op2 = 0b101;
								break;
							case "strh":
								op1 = 2;
								op2 = 0b100;
								break;
						}
						// Alignment check
						if (rm & (op1 - 1)) {
							errors.push({type:"warning",kind:"Misaligned memory instruction",token:tk});
						}
						if (rd >= 8 || rn >= 8) {
							errors.push({type:"error",kind:"Can't use high registers with immediate memory instruction",token:tk});
							return [];
						}
						rm = Math.floor(rm / op1);
						if (rm >= 32) {
							errors.push({type:"error",kind:"Too big of an immediate for memory instruction",token:tk});
							return [];
						}
						return [{size:2,val:((0x6000 + (op2 << 11)) | (rm << 6) | (rn << 3) | (rd << 0))}];
					} else if (tree.form == "register") {
						switch (tree.kind) {
							case "ldr":
								op2 = 0b100;
								break;
							case "ldrb":
								op2 = 0b110;
								break;
							case "ldrh":
								op2 = 0b101;
								break;
							case "ldrsb":
								op2 = 0b011;
								break;
							case "ldrsh":
								op2 = 0b111;
								break;
							case "str":
								op2 = 0b000;
								break;
							case "strb":
								op2 = 0b010;
								break;
							case "strh":
								op2 = 0b001;
								break;
						}
						if (rd >= 8 || rn >= 8 || rm >= 8) {
							errors.push({type:"error",kind:"Can't use high registers for three-register memory operations",token:tk});
							return [];
						}
						return [{size:2,val:(0x5000 | (op2 << 9) | (rm << 6) | (rn << 3) | (rd << 0))}];
					} else {
						errors.push({type:"error",kind:"Got weird instruction of neither immediate nor register form",token:tk});
						return [];
					}
				case "stm":
				case "ldm":
					if (rn >= 8) {
						errors.push({type:"error",kind:"Can't use LDM/STM with high registers",token:tk});
					}
				case "push":
				case "pop":
					switch (tree.kind) {
						case "push":
							op1 = 0b1;
							op2 = 0b0;
							break;
						case "pop":
							op1 = 0b1;
							op2 = 0b1;
							break;
						case "stm":
							op1 = 0b0;
							op2 = 0b0;
							break;
						case "ldm":
							op1 = 0b0;
							op2 = 0b1;
							break;
					}
					let bitmask = 0x00;
					for (const child of tree.list) {
						if (child.kind == "single") {
							const subchild = emit(child.child);
							if ((subchild == 14 || subchild == 15) && op1 == 0b1) {
								bitmask |= 0x100;
							} else if (subchild >= 8) {
								errors.push({type:"error",kind:"Can't use high registers in multi-memory instruction",token:tk});
								return [];
							} else {
								bitmask |= (1 << subchild);
							}
						} else if (child.kind == "range") {
							const left = emit(child.left);
							const right = emit(child.right);
							if (left >= 8 || right >= 8 || left < 0 || right < 0) {
								errors.push({type:"error",kind:"Can't use high registers in multi-memory instruction",token:tk});
								return [];
							}
							for (let i = left; i <= right; i += 1) {
								bitmask |= (1 << i);
							}
						} else {
							errors.push({type:"warning",kind:"Invalid child inside register list",token:tk});
						}
					}
					return [{size:2,val:((op1 == 0b1 ? 0xb000 : 0xc000) | (op2 << 11) | (op1 == 0b1 ? 0x400 : (rn << 8)) | (bitmask << 0))}];
			}
			break;
		case "int":
			switch (tree.kind) {
				default:
					break;
				case "integer":
					return tree.val;
				case "unary":
					if (tree.operator == "sub") {
						return -emit(tree.child,errors);
					} else if (tree.operator == "not") {
						return !emit(tree.child,errors);
					} else{
						return emit(tree.child,errors);
					}
				case "shift":
					let left = emit(tree.left,errors);
					let right = emit(tree.right,errors);
					switch (tree.operator) {
						case "lsl":
							return left << right;
						case "lsr":
							// Dumb shenanigans to ensure the shift is logical
							return (left >> right) &~(((1 << (right + 1)) - 1) << (32 - right));
						case "asr":
							// Same here to ensure it's arithmetic
							return (left >> right) | (((1 << (right + 1)) - 1) << (32 - right));
						case "ror":
							return (left >> right) &~(((1 << (right + 1)) - 1) << (32 - right)) | (left << (32 - right));
					}
				case "bits":
					switch (tree.operator) {
						case "and":
							return emit(tree.left,errors) & emit(tree.right,errors);
						case "or":
							return emit(tree.left,errors) | emit(tree.right,errors);
						case "xor":
							return emit(tree.left,errors) ^ emit(tree.right,errors);
					}
				case "prod":
					switch (tree.operator) {
						case "mul":
							return emit(tree.left,errors) * emit(tree.right,errors);
						case "div":
							return emit(tree.left,errors) / emit(tree.right,errors);
						case "mod":
							return emit(tree.left,errors) % emit(tree.right,errors);
					}
				case "sum":
					switch (tree.operator) {
						case "add":
							return emit(tree.left,errors) + emit(tree.right,errors);
						case "sub":
							return emit(tree.left,errors) - emit(tree.right,errors);
					}
				case "cmp":
					switch(tree.operator) {
						case "lt":
							return +(emit(tree.left,errors) < emit(tree.right,errors))
						case "gt":
							return +(emit(tree.left,errors) > emit(tree.right,errors))
						case "le":
							return +(emit(tree.left,errors) <= emit(tree.right,errors))
						case "ge":
							return +(emit(tree.left,errors) >= emit(tree.right,errors))
						case "eq":
							return +(emit(tree.left,errors) === emit(tree.right,errors))
						case "neq":
							return +(emit(tree.left,errors) !== emit(tree.right,errors))
					}
				case "sel":
					let cond = emit(tree.cond,errors);
					if (cond) {
						return emit(tree.left,errors);
					} else {
						return emit(tree.right,errors);
					}
			}
		case "reg":
			switch (tree.kind) {
				default:
					break;
				case "register":
					return tree.val;
				case "sel":
					let cond = emit(tree.cond,errors);
					if (cond) {
						return emit(tree.left,errors);
					} else {
						return emit(tree.right,errors);
					}
			}
		case "any":
			switch (tree.kind) {
				default:
					break;
				case "sel":
					let cond = emit(tree.cond,errors);
					if (cond) {
						return emit(tree.left,errors);
					} else {
						return emit(tree.right,errors);
					}
			}
			break;
		default:
			break;
	}
}

function align(values) {
	let bytes = [];
	let org = 0;
	let filler = 0x00;
	for (const val of values) {
		let natural = Math.ceil(org / val.size) * val.size;
		while (org < natural) {
			bytes.push(filler);
			org += 1;
		}
		let buffer = val.val;
		for (let i = 0; i < val.size; i += 1) {
			bytes.push(buffer & 0xff);
			buffer >>= 8;
		}
	}
	return bytes;
}

function align_jp(values) {
	let bytes = [];
	let filler = 0x51;
	for (const val of values) {
		let natural = Math.ceil(bytes.length / val.size) * val.size;
		while (bytes.length < natural) {
			bytes.push(filler);
		}
		let val_buffer = val.val;
		let bytes_buffer = [];
		for (let i = 0; i < val.size; i += 1) {
			bytes_buffer.push(val_buffer & 0xff);
			val_buffer >>= 8;
		}
		if (Math.floor(bytes.length / 9) < Math.floor((bytes.length + val.size) / 9)) {
			// Crossing a 0xFF
			let sub_offset = Math.ceil(bytes.length / 9) * 9 - bytes.length;
			if (bytes_buffer[sub_offset - 1] != 0xFF) {
				if ((Math.floor(bytes.length / 9) & 1) == 1) {
					bytes.splice(-2, 0, 0x00, 0xe0, 0xff, 0xff);
				} else {
					bytes.push(0xff);
				}
				// Do natural alignment again
				natural = Math.ceil(bytes.length / val.size) * val.size;
				while (bytes.length < natural) {
					bytes.push(filler);
				}
			}
		}
		bytes = bytes.concat(bytes_buffer);
	}
	return bytes;
}

function convert_jp(values) {
	// Blatantly ripped from it-is-final's rse-text-decoder
	const map = new Map([
		[0x00, '\u3000'],
		[0x01, 'あ'], [0x02, 'い'], [0x03, 'う'], [0x04, 'え'], [0x05, 'お'],
		[0x06, 'か'], [0x07, 'き'], [0x08, 'く'], [0x09, 'け'], [0x0a, 'こ'],
		[0x0b, 'さ'], [0x0c, 'し'], [0x0d, 'す'], [0x0e, 'せ'], [0x0f, 'そ'],
		[0x10, 'た'], [0x11, 'ち'], [0x12, 'つ'], [0x13, 'て'], [0x14, 'と'],
		[0x15, 'な'], [0x16, 'に'], [0x17, 'ぬ'], [0x18, 'ね'], [0x19, 'の'],
		[0x1a, 'は'], [0x1b, 'ひ'], [0x1c, 'ふ'], [0x1d, 'へ'], [0x1e, 'ほ'],
		[0x1f, 'ま'], [0x20, 'み'], [0x21, 'む'], [0x22, 'め'], [0x23, 'も'],
		[0x24, 'や'], [0x25, 'ゆ'], [0x26, 'よ'],
		[0x27, 'ら'], [0x28, 'り'], [0x29, 'る'], [0x2a, 'れ'], [0x2b, 'ろ'],
		[0x2c, 'わ'], [0x2d, 'を'], [0x2e, 'ん'],
		[0x2f, 'ぁ'], [0x30, 'ぃ'], [0x31, 'ぅ'], [0x32, 'ぇ'], [0x33, 'ぉ'],
		[0x34, 'ゃ'], [0x35, 'ゅ'], [0x36, 'ょ'],
		[0x37, 'が'], [0x38, 'ぎ'], [0x39, 'ぐ'], [0x3a, 'げ'], [0x3b, 'ご'],
		[0x3c, 'ざ'], [0x3d, 'じ'], [0x3e, 'ず'], [0x3f, 'ぜ'], [0x40, 'ぞ'],
		[0x41, 'だ'], [0x42, 'ぢ'], [0x43, 'づ'], [0x44, 'で'], [0x45, 'ど'],
		[0x46, 'ば'], [0x47, 'び'], [0x48, 'ぶ'], [0x49, 'べ'], [0x4a, 'ぼ'],
		[0x4b, 'ぱ'], [0x4c, 'ぴ'], [0x4d, 'ぷ'], [0x4e, 'ぺ'], [0x4f, 'ぽ'],
		[0x50, 'っ'],
		[0x51, 'ア'], [0x52, 'イ'], [0x53, 'ウ'], [0x54, 'エ'], [0x55, 'オ'],
		[0x56, 'カ'], [0x57, 'キ'], [0x58, 'ク'], [0x59, 'ケ'], [0x5a, 'コ'],
		[0x5b, 'サ'], [0x5c, 'シ'], [0x5d, 'ス'], [0x5e, 'セ'], [0x5f, 'ソ'],
		[0x60, 'タ'], [0x61, 'チ'], [0x62, 'ツ'], [0x63, 'テ'], [0x64, 'ト'],
		[0x65, 'ナ'], [0x66, 'ニ'], [0x67, 'ヌ'], [0x68, 'ネ'], [0x69, 'ノ'],
		[0x6a, 'ハ'], [0x6b, 'ヒ'], [0x6c, 'フ'], [0x6d, 'ヘ'], [0x6e, 'ホ'],
		[0x6f, 'マ'], [0x70, 'ミ'], [0x71, 'ム'], [0x72, 'メ'], [0x73, 'モ'],
		[0x74, 'ヤ'], [0x75, 'ユ'], [0x76, 'ヨ'],
		[0x77, 'ラ'], [0x78, 'リ'], [0x79, 'ル'], [0x7a, 'レ'], [0x7b, 'ロ'],
		[0x7c, 'ワ'], [0x7d, 'ヲ'], [0x7e, 'ン'],
		[0x7f, 'ァ'], [0x80, 'ィ'], [0x81, 'ゥ'], [0x82, 'ェ'], [0x83, 'ォ'],
		[0x84, 'ャ'], [0x85, 'ュ'], [0x86, 'ョ'],
		[0x87, 'ガ'], [0x88, 'ギ'], [0x89, 'グ'], [0x8a, 'ゲ'], [0x8b, 'ゴ'],
		[0x8c, 'ザ'], [0x8d, 'ジ'], [0x8e, 'ズ'], [0x8f, 'ゼ'], [0x90, 'ゾ'],
		[0x91, 'ダ'], [0x92, 'ヂ'], [0x93, 'ヅ'], [0x94, 'デ'], [0x95, 'ド'],
		[0x96, 'バ'], [0x97, 'ビ'], [0x98, 'ブ'], [0x99, 'ベ'], [0x9a, 'ボ'],
		[0x9b, 'パ'], [0x9c, 'ピ'], [0x9d, 'プ'], [0x9e, 'ペ'], [0x9f, 'ポ'],
		[0xa0, 'ッ'],
		// Full-width characters are used for the Latin charcters in this map
		[0xa1, '０'],
		[0xa2, '１'], [0xa3, '２'], [0xa4, '３'],
		[0xa5, '４'], [0xa6, '５'], [0xa7, '６'],
		[0xa8, '７'], [0xa9, '８'], [0xaa, '９'],
		[0xab, '！'], [0xac, '？'], [0xad, '。'],
		[0xae, 'ー'], [0xaf, '・'], [0xb0, '‥'],
		[0xb1, '『'], [0xb2, '』'],
		[0xb3, '「'], [0xb4, '」'],
		[0xb5, '♂'], [0xb6, '♀'],
		[0xb7, '円'], [0xb8, '．'], [0xb9, '×'], [0xba, '／'],
		[0xbb, 'Ａ'], [0xbc, 'Ｂ'], [0xbd, 'Ｃ'],
		[0xbe, 'Ｄ'], [0xbf, 'Ｅ'], [0xc0, 'Ｆ'],
		[0xc1, 'Ｇ'], [0xc2, 'Ｈ'], [0xc3, 'Ｉ'],
		[0xc4, 'Ｊ'], [0xc5, 'Ｋ'], [0xc6, 'Ｌ'],
		[0xc7, 'Ｍ'], [0xc8, 'Ｎ'], [0xc9, 'Ｏ'],
		[0xca, 'Ｐ'], [0xcb, 'Ｑ'], [0xcc, 'Ｒ'], [0xcd, 'Ｓ'],
		[0xce, 'Ｔ'], [0xcf, 'Ｕ'], [0xd0, 'Ｖ'],
		[0xd1, 'Ｗ'], [0xd2, 'Ｘ'], [0xd3, 'Ｙ'], [0xd4, 'Ｚ'],
		[0xd5, 'ａ'], [0xd6, 'ｂ'], [0xd7, 'ｃ'],
		[0xd8, 'ｄ'], [0xd9, 'ｅ'], [0xda, 'ｆ'],
		[0xdb, 'ｇ'], [0xdc, 'ｈ'], [0xdd, 'ｉ'],
		[0xde, 'ｊ'], [0xdf, 'ｋ'], [0xe0, 'ｌ'],
		[0xe1, 'ｍ'], [0xe2, 'ｎ'], [0xe3, 'ｏ'],
		[0xe4, 'ｐ'], [0xe5, 'ｑ'], [0xe6, 'ｒ'], [0xe7, 'ｓ'],
		[0xe8, 'ｔ'], [0xe9, 'ｕ'], [0xea, 'ｖ'],
		[0xeb, 'ｗ'], [0xec, 'ｘ'], [0xed, 'ｙ'], [0xee, 'ｚ'],
		[0xef, '►'], [0xf0, '：'],
		[0xf1, 'Ä'], [0xf2, 'Ö'], [0xf3, 'Ü'],
		[0xf4, 'ä'], [0xf5, 'ö'], [0xf6, 'ü'],
		[0xf7, '\x00'], [0xf8, '\x00'], [0xf9, '\x00'],
		[0xfa, '\x00'], [0xfb, '\x00'], [0xfc, '\x00'],
		[0xfd, '\x00'], [0xfe, '\n'], [0xff, '\x00'],
	]);
	let chars = [];
	for (const byte of values) {
		chars.push(map.get(byte));
	}
	let strings = [];
	for (let i = 0; i < chars.length; i += 9) {
		const slice = chars.slice(i, i+9);
		strings.push(`Box ${i/9+1}:  ${slice.map(i => i == '\u3000' ? '\u23b5' : i).join('\u3000')}  [${slice.join("")}]`);
	}
	return strings.join("\n");
}





function assemble() {
	const source = document.getElementById("source").value;
	const tokens = scan(source);
	console.log(tokens);
	const tree = parse(tokens);
	console.log(tree);
	var errs = [];
	const vals = emit(tree, errs);
	console.log(vals);
	const bytes = align_jp(vals);
	console.log(bytes);
	const jp = convert_jp(bytes);
	console.log(jp);
	for (let err of errs) {
		console.log(err);
	}
	document.getElementById("output").value = jp;
}