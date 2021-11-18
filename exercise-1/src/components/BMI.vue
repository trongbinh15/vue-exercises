<template>
  <h2>Body Mass Index</h2>
  <div class="center">
    <div class="container">
      <div class="inputs space">
        <div class="group">
          <label>Height (cm)</label>
          <input v-model="height" type="number" />
        </div>
        <div class="group">
          <label>Weight (kg)</label>
          <input v-model="weight" type="number" />
        </div>
        <button @click="calculate">Calculate</button>

        <h2>
          <strong>{{ bmi }}</strong>
        </h2>
        <p>{{ bmiCommment }}</p>
      </div>
      <div class="references space">
        <p>References:</p>
        <p>to <strong>18.5</strong>: underweight</p>
        <p><strong>18.5</strong> to <strong>24.9</strong>: healthy weight</p>
        <p><strong>24.9</strong> to <strong>29.9</strong>: overweight</p>
        <p>to <strong>29.9</strong>: obese</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BodyMassIndex",
  data() {
    return {
      height: 0,
      weight: 0,
      bmi: 0,
    };
  },
  methods: {
    calculate() {
      const h = this.height / 100;
      if (this.height !== 0) {
        this.bmi = Math.round((this.weight / (h * h)) * 100) / 100;
      } else {
        this.bmi = 0;
      }
    },
  },
  computed: {
    bmiCommment() {
      if (this.bmi === 0) {
        return "";
      }

      const prefix = "You are ";
      if (this.bmi < 18.5) {
        return prefix + "underweight";
      } else if (this.bmi < 24.9) {
        return prefix + "healthy weight";
      } else if (this.bmi < 29.9) {
        return prefix + "overweight";
      } else {
        return prefix + "obses";
      }
    },
  },
};
</script>

<style scoped>
.center {
  display: grid;
  place-items: center;
  width: 100vw;
}

.container {
  display: flex;
}

.references {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.references p {
  margin-top: 0;
  font-style: italic;
}

.space {
  padding: 10px;
}
.group label {
  margin-right: 10px;
}
.group {
  margin: 15px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
