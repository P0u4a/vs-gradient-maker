<script lang="ts">
    function randomColorGenerator() : string {
        const randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);

        return randomColor;
        
    }

    let code : HTMLTextAreaElement;

    function copyCss() {
        code.select();

        navigator.clipboard.writeText(code.value);
    }

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

    let colors = {primaryColor: randomColorGenerator(), secondaryColor: randomColorGenerator()};

    type SelectedDirection = {
        angle?: number;
    };

    type SelectedPosition = {
        position?: string;
    };

    let selectedAngle: SelectedDirection = {angle: 90};
    let selectedPosition: SelectedPosition = {position: "center"}; 

    let animate = false;

    let radial = false;

    let animationLength = 1;

</script>

<div class="title">
    VS Gradient Maker
</div>

<div class="container">
    <div class="selections">
        Gradient Type
        <select bind:value={radial}>
            <option value={false} selected>Linear</option>
            <option value={true}>Radial</option>        
        </select>
        
        Gradient Direction
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
        
        Animate Gradient
        <select bind:value={animate}>
            <option value={false} selected>❌</option>
            <option value={true}>✅</option>        
        </select>

        Animation Length
        <input disabled={!animate} type="range" min=1 max=59 bind:value={animationLength} />        
    </div>

    <div class="primaryColor">
        <input type="color" bind:value={colors.primaryColor} />        
        <input type="text" bind:value={colors.primaryColor}/>
    </div>

    <div class="secondaryColor">
        <input type="color" bind:value={colors.secondaryColor} />
        <input type="text" bind:value={colors.secondaryColor}/>
    </div>

    <div class="randomBtn">
        <button on:click={() => {
            colors.primaryColor = randomColorGenerator();
            colors.secondaryColor = randomColorGenerator();
        }}>
            Randomize Colors
        </button>
    </div>
    
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


    <div class="code">
        <button on:click={() => { copyCss() }}>
            Copy CSS
        </button>

        {#if animate && !radial}
        <textarea readonly bind:this={code}>
            background: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor});
            animation: gradient {animationLength}s ease infinite;
            @keyframes gradient &lbrace;
                0%&lbrace;background-position:0% 50%&rbrace;
                50%&lbrace;background-position:100% 50%&rbrace;
                100%&lbrace;background-position:0% 50%&rbrace;
            &rbrace;
        </textarea>
        {:else if animate && radial}
            <textarea readonly bind:this={code}>
                background: radial-gradient(circle at {selectedPosition.position}, {colors.primaryColor}, {colors.secondaryColor});
                animation: gradient {animationLength}s ease infinite;
                @keyframes gradient &lbrace;
                    0%&lbrace;background-position:0% 50%&rbrace;
                    50%&lbrace;background-position:100% 50%&rbrace;
                    100%&lbrace;background-position:0% 50%&rbrace;
                &rbrace;
            </textarea>
        {:else if !animate && radial}
            <textarea readonly bind:this={code}>
                background: radial-gradient(circle at {selectedPosition.position}, {colors.primaryColor}, {colors.secondaryColor});
            </textarea>
        {:else}
            <textarea readonly bind:this={code}>
                background: linear-gradient({selectedAngle.angle}deg, {colors.primaryColor}, {colors.secondaryColor});
            </textarea>
        {/if}
    </div>
</div>

<style>
    .title {
        margin: 4rem 0;
        text-align: center;
        line-height: 0;
        font-size: 4rem;
        color:#37a7f2;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 0.5fr repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .selections {
        grid-area: 1 / 1 / 2 / 6;
    }

    .primaryColor {
        grid-area: 5 / 1 / 6 / 3; 
    }

    .secondaryColor {
        grid-area: 5 / 4 / 6 / 6; 
        margin-left: auto;    
    }

    .randomBtn {
        grid-area: 5 / 3 / 6 / 4; 
    }

    .code {
        grid-area: 6 / 1 / 7 / 6;
    }

    .noAnimateDisplay {
        grid-area: 2 / 1 / 5 / 6;
        border: 2px solid rgba(1,1,1,0,0.35);
        height: 350px;
        margin-bottom: 0.5rem;
    }

    .animateDisplay {
        grid-area: 2 / 1 / 5 / 6;
        border: 2px solid rgba(1,1,1,0,0.35);
        height: 350px;
        background-size: 400% 400%;
        animation: gradient var(--animationLength) ease infinite;
        margin-bottom: 0.5rem;
    }

    @keyframes gradient {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }

</style>