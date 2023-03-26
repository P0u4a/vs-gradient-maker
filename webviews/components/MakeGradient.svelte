<script lang="ts">
    import { randomColorGenerator } from "../utils/randomColorGenerator";
    import { copyCss } from "../utils/copyCss";

    // The colourStop will likely turn into its own component
    type ColorStop = {
        color: string;
        position: number;
    };

    let colorStops: ColorStop[] = [
        { color: randomColorGenerator(), position: 0 },
        { color: randomColorGenerator(), position: 100 },
    ];

    // Select options
    const linearDirections = [
        { angle: 0, logo: "⬆️" },
        { angle: 45, logo: "↗️" },
        { angle: 270, logo: "➡️" },
        { angle: 135, logo: "↘️" },
        { angle: 180, logo: "⬇️" },
        { angle: 225, logo: "↙️" },
        { angle: 90, logo: "⬅️" },
        { angle: 315, logo: "↖️" },
    ];

    const radialPositions = [
        { position: "center", logo: "🅾️" },
        { position: "top", logo: "⬆️" },
        { position: "right top", logo: "↗️" },
        { position: "right", logo: "➡️" },
        { position: "right bottom", logo: "↘️" },
        { position: "bottom", logo: "⬇️" },
        { position: "left bottom", logo: "↙️" },
        { position: "left", logo: "⬅️" },
        { position: "left top", logo: "↖️" },
    ];

    // CSS code to copy
    let code: HTMLTextAreaElement;

    // Custom types for selected options
    type SelectedDirection = {
        angle?: number;
    };

    type SelectedPosition = {
        position?: string;
    };

    let selectedAngle: SelectedDirection = { angle: 90 };
    let selectedPosition: SelectedPosition = { position: "center" };

    let animate = false;

    let radial = false;

    let animationLength = 1;

    // All of these functions will be converted to modules and go in the utils directory
    function addColor() {

        let increment = colorStops[colorStops.length - 1].position+10;

        // Prevent position value from overflowing
        if (increment > 100) {
            increment = (colorStops[colorStops.length - 1].position/2);
        }

        const newColor = {
            color: randomColorGenerator(),
            position: increment
        };

        colorStops = [...colorStops, newColor];
    }

    function removeColor(index: number) {
        if (colorStops.length === 2) {
            return;
        }

        colorStops = colorStops.filter((_, i) => i !== index);
    }

    function getGradient() {
        const colors = colorStops
            .sort((a, b) => a.position - b.position)
            .map((color, i) => `${color.color} ${color.position}%`)
            .join(", ");

        const direction = radial
            ? selectedPosition.position
            : selectedAngle.angle;

        return `background-image: linear-gradient(${direction}, ${colors});`;
    }

    function randomise() {
        colorStops.forEach((color) => {
            color.color = randomColorGenerator();
        });
    }
</script>

<div class="container">
    <div class="selections">
        <span class="select-heading">Gradient Type</span>
        <select bind:value={radial}>
            <option value={false} selected>Linear</option>
            <option value={true}>Radial</option>
        </select>

        <span class="select-heading">Gradient Direction</span>
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

        <span class="select-heading">Animate Gradient</span>
        <select bind:value={animate}>
            <option value={false} selected>❌</option>
            <option value={true}>✅</option>
        </select>

        <span class="select-heading">Animation Length</span>
        <input
            disabled={!animate}
            type="range"
            min="1"
            max="59"
            bind:value={animationLength}
        />
    </div>
    <div class="gradient-preview" style={getGradient()} />

    <div class="top-btn">
        <button on:click={addColor}>
            Add color
        </button>
    
        <button
            on:click={() => {
                randomise();
            }}
        >
            Randomize Colors
        </button>
    </div>

    <div class="color-stops">
        {#each colorStops as color, i}
            <div class="color-control">
                <input type="color" bind:value={color.color} />
                <input
                    class="color-input"
                    type="number"
                    min="0"
                    max="100"
                    bind:value={color.position}
                />
                <button class="delete-btn" on:click={() => removeColor(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 16 16" width="16" height="16"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path></svg>
                </button>
            </div>
        {/each}
    </div>

    <div class="code">
        <button class="copy-btn" on:click={() => { copyCss(code) }}>
            Copy CSS
        </button>
        <textarea readonly>
            CSS CODE WILL GO HERE
        </textarea>
    </div>


</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .selections {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    }

    .gradient-preview {
        height: 300px;
        width: 100%;
        background-color: black;
    }

    .color-stops {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 10px;
        margin-right: auto;
        margin-left: 0;
    }

    .color-control {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }

    .color-control input[type="color"] {
        margin-bottom: 5px;
    }

    .top-btn {
        margin-right: auto;
        margin-left: 0;
    }

    .delete-btn {
        margin-top: 5px;
        width: 20px;
        height: 20px;
    }

    .code {
        width: 100%;
        margin-right: auto;
        margin-left: 0;
        margin-top: 10px;
    }

    .select-heading {
        margin-right:5px; 
        margin-left: 5px;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
