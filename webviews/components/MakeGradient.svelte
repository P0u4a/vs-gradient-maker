<script lang="ts">

    let directions = [
        {angle: 0, logo: "⬆️"},
        {angle: 45, logo: "↗️"},
        {angle: 270, logo: "➡️"},
        {angle: 135, logo: "↘️"},
        {angle: 180, logo: "⬇️"},
        {angle: 225, logo: "↙️"},
        {angle: 90, logo: "⬅️"},
        {angle: 315, logo: "↖️"},
    ];

    let colors = {primaryColor: "#000000", secondaryColor: "#000000"};

    type SelectedDirection = {
        angle?: number;
        logo?: string;
    };

    let selectedAngle: SelectedDirection = {angle: 90};

    let animate = false;
    let animationLength = 1;

</script>

<h1>Gradient Maker</h1>

{#if animate}
<div class="animateDisplay" 
    style="background-image: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor}); --animationLength:{animationLength}s"
/>
{:else}
<div class="noAnimateDisplay" 
    style="background-image: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor})"
/>
{/if}

<form>
    <b>Primary Color</b>
    <input type="color" bind:value={colors.primaryColor} />
    <b>Secondary Color</b>
    <input type="color" bind:value={colors.secondaryColor} />

    <b>Gradient Direction</b>
    <br />
	<select bind:value={selectedAngle}>
		{#each directions as direction}
			<option value={direction}>
				{direction.logo}
			</option>
		{/each}
	</select>
    <br />
    
    <label>
        <input type="checkbox" bind:checked={animate} />
        <b>Animate Gradient</b>
    </label>
    {#if animate}
    <br />
    <b>Animation Length</b>
    <input type="range" min=1 max=59 bind:value={animationLength} />
    {/if}

    <br />
    <b>CSS:</b>
    <div class="code">
        <code>
            {#if animate}
            background: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor});
            <br />
            animation: gradient {animationLength}s ease infinite;
            <br />
            @keyframes gradient &lbrace;
                0%&lbrace;background-position:0% 50%&rbrace;
                50%&lbrace;background-position:100% 50%&rbrace;
                100%&lbrace;background-position:0% 50%&rbrace;
            &rbrace;
            {:else}
            background: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor});
            {/if}
        </code>
    </div>

</form>

<style>
    .noAnimateDisplay {
        margin: auto;        
        width: 500px;
        height: 250px;
        border: 2px solid rgba(1,1,1,0,0.35);
    }

    .animateDisplay {
        margin: auto;        
        width: 500px;
        height: 250px;
        border: 2px solid rgba(1,1,1,0,0.35);
        background-size: 400% 400%;
        animation: gradient var(--animationLength) ease infinite;
    }

    @keyframes gradient {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }

    code {
        background-color: #57595f;
        font-family: courier, monospace;
        padding: 0 3px;
        color: whitesmoke;
    }

</style>