<script>
	import Deepdwn from "$lib/components/deepdwn.svelte";
	import DeepDwn from "$lib/components/deepdwn.svelte";
	import GameDisplay from "$lib/components/gameUI/gameDisplay.svelte";
	import * as PIXI from 'pixi.js'
	import { onMount } from "svelte";

	onMount(() => {
	console.log(PIXI, "hi, pixi.js here")
	})
</script>

<Deepdwn />
