<script lang="ts">

    const linearDirections = [
        {angle: 0, logo: "⬆️"},
        {angle: 45, logo: "↗️"},
        {angle: 270, logo: "➡️"},
        {angle: 135, logo: "↘️"},
        {angle: 180, logo: "⬇️"},
        {angle: 225, logo: "↙️"},
        {angle: 90, logo: "⬅️"},
        {angle: 315, logo: "↖️"},
    ];

    const radialPositions = [
        {position: "center", logo: "🅾️"},
        {position: "top", logo: "⬆️"},
        {position: "right top", logo: "↗️"},
        {position: "right", logo: "➡️"},
        {position: "right bottom", logo: "↘️"},
        {position: "bottom", logo: "⬇️"},
        {position: "left bottom", logo: "↙️"},
        {position: "left", logo: "⬅️"},
        {position: "left top", logo: "↖️"}
    ];

    let colors = {primaryColor: "#000000", secondaryColor: "#000000"};

    type SelectedDirection = {
        angle?: number;
        logo?: string;
    };

    type SelectedPosition = {
        position?: string;
        logo?: string;
    };

    let selectedAngle: SelectedDirection = {angle: 90};
    let selectedPosition: SelectedPosition = {position: "center"}; 

    let animate = false;

    let radial = false;

    let animationLength = 1;

</script>

<h1>Gradient Maker</h1>

{#if animate && !radial}
    <div class="animateDisplay" 
        style="background-image: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor}); --animationLength:{animationLength}s"
    />
{:else if animate && radial}
    <div class="animateDisplay" 
        style="background-image: radial-gradient(circle at {selectedPosition.position}, {colors.primaryColor}, {colors.secondaryColor}); --animationLength:{animationLength}s"
    />
{:else if !animate && radial}
    <div class="noAnimateDisplay" 
        style="background-image: radial-gradient(circle at {selectedPosition.position}, {colors.primaryColor}, {colors.secondaryColor})"
    />
{:else}
    <div class="noAnimateDisplay" 
        style="background-image: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor})"
    />
{/if}

<form>
    <b>Colors</b>
    <input type="color" bind:value={colors.primaryColor} />
    <input type="color" bind:value={colors.secondaryColor} />
    
    <b>Gradient Type</b>
    <label>
        <input type=radio bind:group={radial} checked={true} value={false}>
        Linear
    </label>
    
    <label>
        <input type=radio bind:group={radial} value={true}>
        Radial
    </label>

    {#if radial}
        <b>Gradient Position</b>
    {:else}
        <b>Gradient Direction</b>
    {/if}
    <br />

    {#if radial}
        <select bind:value={selectedPosition}>
            {#each radialPositions as position}
                <option value={position}>
                    {position.logo}
                </option>
            {/each}
        </select>
    {:else}
        <select bind:value={selectedAngle}>
            {#each linearDirections as direction}
                <option value={direction}>
                    {direction.logo}
                </option>
            {/each}
        </select>
    {/if}
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

    <b>CSS:</b>
    <div class="code">
        <code>
            {#if animate && !radial}
                background: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor});
                <br />
                animation: gradient {animationLength}s ease infinite;
                <br />
                @keyframes gradient &lbrace;
                    0%&lbrace;background-position:0% 50%&rbrace;
                    50%&lbrace;background-position:100% 50%&rbrace;
                    100%&lbrace;background-position:0% 50%&rbrace;
                &rbrace;
            {:else if animate && radial}
                background: radial-gradient(circle at {selectedPosition.position}, {colors.primaryColor}, {colors.secondaryColor});
                <br />
                animation: gradient {animationLength}s ease infinite;
                <br />
                @keyframes gradient &lbrace;
                    0%&lbrace;background-position:0% 50%&rbrace;
                    50%&lbrace;background-position:100% 50%&rbrace;
                    100%&lbrace;background-position:0% 50%&rbrace;
            {:else if !animate && radial}
                background: radial-gradient(circle at {selectedPosition.position}, {colors.primaryColor}, {colors.secondaryColor});
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