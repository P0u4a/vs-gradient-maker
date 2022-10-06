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

    let colors = {firstColor: "#000000", secondColor: "#000000"};

    // type SelectedDirection = {
    //     [key: number]: any;
    //     [key: string]: any;
    // };

    type SelectedDirection = {
        angle?: number;
        logo?: string;
    };

    let selectedAngle: SelectedDirection = {angle: 90};

</script>

<h1>Gradient Maker</h1>

<div class="display" />

<form>
    Color 1
    <input type="color" bind:value={colors.firstColor}/>
    Color 2
    <input type="color" bind:value={colors.secondColor}/>

    Gradient Direction
	<select bind:value={selectedAngle}>
		{#each directions as direction}
			<option value={direction}>
				{direction.logo}
			</option>
		{/each}
	</select>

    <div class="code">
        background: linear-gradient({selectedAngle.angle}deg, {colors.firstColor}, {colors.secondColor});
    </div>

</form>

<style>
    .display {
        width: 140px;
        height: 70px;
        border: 2px solid rgba(1,1,1,0,0.35);
        background: linear-gradient(90deg, blue , red);
    }

    .code {
        font-family: "Lucida Console";
        background-color: rgba(29, 31, 35);
    }   

</style>