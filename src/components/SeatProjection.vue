<template>
  <div class="seatBox" :style="boxStyle">
    <div class="colouredBar" :style="barStyle"></div>
    <div class="electionNum" :style="numStyle">
      {{ electionValue }}
      <span v-if="electionValue > 10 && canShowAdditional" class="additional"
        ><span v-if="!flip && additionalVal > 0">+</span>{{ additionalVal }}
        <span v-if="!flip"
          >seat<span v-if="additionalVal > 1 || additionalVal < -1"
            >s</span
          ></span
        ></span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "SeatProjection",
  props: {
    electionValue: Number,
    electionParty: String,
    currentView: String,
    flip: Boolean,
    difference: Number,
  },
  created() {
    window.addEventListener("resize", this.getWindowWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  data() {
    this.getWindowWidth();
    let partyHex = this.$t(
      this.currentView + "." + this.electionParty + "-colour"
    );
    let barWidth = (this.electionValue / 338) * 100;
    let flipBox = "column";
    let additionalVal = this.difference;
    if (this.flip) {
      flipBox = "column-reverse";
      additionalVal = this.electionParty;
    }
    return {
      canShowAdditional: window.innerWidth > 800,
      additionalVal: additionalVal,
      partyName: this.currentView + "." + this.electionParty,
      barStyle: {
        backgroundColor: partyHex,
      },
      numStyle: {
        color: partyHex,
      },
      boxStyle: {
        width: barWidth + "%",
        flexDirection: flipBox,
      },
    };
  },
  methods: {
    getWindowWidth() {
      this.canShowAdditional = window.innerWidth > 800;
    },
  },
};
</script>
<style>
.colouredBar {
  height: 25px;
  border-radius: 5px;
}
.seatBox {
  display: flex;
  /* flex-direction: column-reverse; */
  margin: 2px;
}
.electionNum {
  font-weight: bold;
  font-size: 20px;
  text-align: left;
}
.additional {
  font-weight: 400;
  font-size: 13px;
  color: #2c3e50;
}
@media only screen and (max-width: 800px) {
  .electionNum {
    font-size: 15px;
  }
}
</style>
