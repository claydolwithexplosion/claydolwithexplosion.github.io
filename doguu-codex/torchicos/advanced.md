---
layout: base
title: TorchicOS
---

<style>
	:root {
		font-size: 18px;
	}
	body {
		font-size: inherit;
	}
</style>

# TorchicOS - Advanced Setup

Requirements:
- Basic TorchicOS set up (see [here](index.md) for that)

To really get started with TorchicOS, you'll want the advanced setup. This is what gives TorchicOS most of its modularity functionality. After that, the path diverges, you can get any module in roughly any order, except for some modules that build on one-another.

First of all, "W" - the intermediate base64 writer, will get replaced by two modules; "B64" - the base64 decoder, and "WES" - the writer, execute and script module. These two each do additional jobs though; "B64" doesn't just allow for decoding base64, but also for a more flexible and reusable module infrastructure, and "WES" of course can execute data as code or as script, additionally to writing it into the box names.

