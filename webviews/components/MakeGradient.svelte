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

    // type SelectedDirection = {
    //     [key: number]: any;
    //     [key: string]: any;
    // };

    type SelectedDirection = {
        angle?: number;
        logo?: string;
    };

    let selectedAngle: SelectedDirection = {angle: 90};

    let animate: boolean = false;
    let speed: number = 0;

</script>

<h1>Gradient Maker</h1>

<div class="display" 
    style="background-image: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor} 0%, {colors.secondaryColor} 100%)"
/>

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
    
    <b>Animate Gradient ?</b>
    <input type="checkbox" bind:checked={animate} />
    {#if animate}
    <b>Set The Animation Speed</b>
    <input type="range" bind:value={speed} />
    <p>{speed}</p>
    {/if}

    <br />
    <b>CSS:</b>
    <div class="code">
        <code>
            {#if animate}
            background: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor});
            <br />
            animation: AnimationName 36s ease infinite;
            {:else}
            background: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor});
            {/if}
        </code>
    </div>

</form>

<style>
    .display {
        margin: auto;        
        width: 500px;
        height: 250px;
        border: 2px solid rgba(1,1,1,0,0.35);
    }

    code {
        background-color: #57595f;
        font-family: courier, monospace;
        padding: 0 3px;
        color: whitesmoke;
    }

</style>