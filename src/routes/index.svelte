<script>
	import Console from "$lib/components/gameUI/console.svelte";
	import MouseOverInfo from "$lib/components/gameUI/mouseOverInfo.svelte";
	import Game from "$lib/stores/gameStore";
	import { onMount } from "svelte";

	let gameContainer;

	onMount(() => {
		$Game.init(gameContainer);
	});
</script>

<section>
	<div class="displayOptions">
		<MouseOverInfo />
		<div bind:this={gameContainer} class="border-4 border-white mb-4 rounded-lg" />
		<Console />
	</div>
</section>

<style>
	@font-face {
		font-family: PressStart2P;
		src: url("./../assets/fonts/PressStart2P-Regular.ttf");
	}

	.displayOptions {
		align-items: center;
		background: #1d1d1d;
		bottom: 0px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		left: 0px;
		position: absolute;
		right: 0px;
		top: 0px;
	}

</style>
