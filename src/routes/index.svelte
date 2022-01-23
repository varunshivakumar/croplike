<script>
	import GameDisplay from "$lib/components/gameUI/gameDisplay.svelte";
</script>
  <div class="display">
	<h1 class="neonText">Croplike</h1>
	<p class="neonText">more info 1/31/22</p>
  </div>
  
<style>
	.neonText {
  color: #fff;
  text-shadow:
      0 0 7px #fff,
      0 0 14px #fff,
      0 0 21px #fff,
      0 0 42px #f87171,
      0 0 84px #f87171,
      0 0 91px #f87171,
      0 0 105px #f87171,
      0 0 140px #f87171;
}

.display {
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