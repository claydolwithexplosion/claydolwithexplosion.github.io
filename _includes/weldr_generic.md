{% capture _ %}{% increment tabcnt %}{% endcapture %}
{% assign localcnt = tabcnt %}
<style>
	#tab{{ localcnt }}1:checked ~ .tab-bar label[for="tab{{ localcnt }}1"],
	#tab{{ localcnt }}2:checked ~ .tab-bar label[for="tab{{ localcnt }}2"],
	#tab{{ localcnt }}3:checked ~ .tab-bar label[for="tab{{ localcnt }}3"],
	#tab{{ localcnt }}4:checked ~ .tab-bar label[for="tab{{ localcnt }}4"] {
		border: 2px solid var(--highlight);
	}
	#tab{{ localcnt }}1:checked ~ .panels #panel{{ localcnt }}1,
	#tab{{ localcnt }}2:checked ~ .panels #panel{{ localcnt }}2,
	#tab{{ localcnt }}3:checked ~ .panels #panel{{ localcnt }}3,
	#tab{{ localcnt }}4:checked ~ .panels #panel{{ localcnt }}4 {
		display: block;
		padding: 1rem 1rem;
		border: 2px solid var(--border);
		border-radius: 6px 6px 0 0;
		border-bottom: 2px solid var(--border);
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
		margin: 3px;
	}
</style>

<div class="tabs">
	<input type="radio" name="tab{{ localcnt }}" id="tab{{ localcnt }}1" checked/>
	<input type="radio" name="tab{{ localcnt }}" id="tab{{ localcnt }}2"/>
	<input type="radio" name="tab{{ localcnt }}" id="tab{{ localcnt }}3"/>
	<input type="radio" name="tab{{ localcnt }}" id="tab{{ localcnt }}4"/>

	<div class="tab-bar">
		<label for="tab{{ localcnt }}1">Code 1</label>
		<label for="tab{{ localcnt }}2">Code 2</label>
		<label for="tab{{ localcnt }}3">Code 3</label>
		<label for="tab{{ localcnt }}4">Nickname</label>
	</div>
	<div class="panels">
<div class="panel" id="panel{{ localcnt }}1" markdown="1">
{%-include weldr_{{include.game}}_{{include.emu}}_c1.md-%}


</div>
<div class="panel" id="panel{{ localcnt }}2" markdown="1">
{%-include weldr_{{include.emu}}_c2.md-%}


</div>
<div class="panel" id="panel{{ localcnt }}3" markdown="1">
{%-include weldr_{{include.emu}}_c3.md-%}


</div>
<div class="panel" id="panel{{ localcnt }}4" markdown="1">
{%-include weldr_{{include.game}}_nickname.md-%}


</div>
</div>
</div>