<script lang="ts">
    import { randomColorGenerator } from "../utils/randomColorGenerator";
    import { copyCss } from "../utils/copyCss";

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

    // Gradient code colors
    enum ColorMode {
        HEX,
        RGB,
        HSL
    }

    // CSS code to copy
    let code: HTMLTextAreaElement;

    let selectedAngle: SelectedDirection = { angle: 90 };
    let selectedPosition: SelectedPosition = { position: "center" };

    let animate = false;

    let radial = false;

    let animationLength = 1;

    function addColor() {
        // Temporary limit on the number of color stops, may change in the future
        if (colorStops.length > 5) return;

        const newColor = {
            color: randomColorGenerator(),
            position:
                // Make sure position value doesn't go over 100
                colorStops[colorStops.length - 1].position + 10 > 100
                    ? colorStops[colorStops.length - 1].position / 2
                    : colorStops[colorStops.length - 1].position + 10,
        };

        colorStops = [...colorStops, newColor];
    }

    function removeColor(index: number) {
        if (colorStops.length === 2) {
            return;
        }

        colorStops = colorStops.filter((_, i) => i !== index);
    }

    let gradient: string;

    $: {
        // Creating a copy to prevent the UI position changing
        // after the ColorStop object is sorted
        const colorStopsCopy = [...colorStops];
        const colors = colorStopsCopy
            // Construct gradient code here
            .sort((a, b) => a.position - b.position)
            .map((color, i) => `${color.color} ${color.position}%`)
            .join(", ");

        const mode = radial ? "radial-gradient(circle at " : "linear-gradient(";

        const direction = radial
            ? selectedPosition.position
            : `${selectedAngle.angle}deg`;

        const animation = animate
            ? `\nbackground-size: 400% 400%;\nanimation: animationName ${animationLength}s ease infinite;
                \n@keyframes animationName {
                    \n  0% { background-position: 0% 50%; }
                    \n  50% { background-position: 100% 50%; }
                    \n  100% { background-position: 0% 50%; }
                  \n}`
            : "";
        gradient = `background: ${mode}${direction}, ${colors}); ${animation}`;
    }

    function randomise() {
        for (let i = 0; i < colorStops.length; i++) {
            colorStops[i].color = randomColorGenerator();
        }
    }

</script>

<div class="container">
    <div class="selections">
        <span class="select-heading">Gradient Type</span>
        <select bind:value={radial}>
            <option value={false} selected>Linear</option>
            <option value={true}>Radial</option>
        </select>

        <span class="select-heading">Color Mode</span>
        <select>
            <option value={ColorMode.HEX} selected>HEX</option>
            <option value={ColorMode.RGB}>RGB</option>
            <option value={ColorMode.HSL}>HSL</option>
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
    <div class="gradient-preview" style={gradient} />

    <div class="top-btn">
        <button on:click={addColor}>Add Color</button>

        <button on:click={randomise}>Randomize</button>
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        style="text-align:center"
                        ><path
                            d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
                        /></svg
                    >
                </button>
            </div>
        {/each}
    </div>

    <div class="code">
        <button
            class="copy-btn"
            on:click={() => {
                copyCss(code);
            }}
        >
            Copy CSS
        </button>
        <textarea readonly bind:this={code}>{gradient}</textarea>
    </div>
</div>