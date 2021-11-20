<script>
    import Metrics from "$lib/stores/metricStore";
</script>

<section class="mounseOverInfo flex flex-col mb-4 text-xs text-white">
    {#if $Metrics.mouseEventData.name}
        <p>
            <span class="text-purple-400">Tile Name</span>: {$Metrics
                .mouseEventData.name}
        </p>
        <p>
            <span class="text-purple-400">Is Explored</span>: {$Metrics
                .mouseEventData.explored}
        </p>
        <p>
            <span class="text-purple-400">Is Walkable</span>: {$Metrics
                .mouseEventData.walkable}
        </p>
    {:else}
        <p class="text-purple-400">Mouseover game map</p>
        <p class="text-purple-400">for basic tile info</p>
    {/if}
</section>

<style>
    .mounseOverInfo {
        font-family: PressStart2P;
        width: 288px;
    }
</style>
