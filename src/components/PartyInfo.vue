<template>
  <div ref="getWidth" class="infoBox">
    <div class="smallPartyLogoCrop">
      <img class="smallPartyLogo" :src="getImgSrc()" />
    </div>
    <div class="partyInfoTable">
      <div>{{ $t(partyName) }}</div>
      <div class="partyInfoGraph">
        <div class="partyInfoNum" :style="numStyle">{{ partyNum }}%</div>
        <div class="colouredBar" :style="barStyle"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PartyInfo",
  props: {
    currentView: String,
    party: String,
    partyNum: Number,
    max: Number,
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  data() {
    let partyHex = this.$t(this.currentView + "." + this.party + "-colour");
    let barWidth =
      (this.partyNum / this.max) * this.getMaxBar(this.initialWidth());
    return {
      partyName: this.currentView + "." + this.party,
      barStyle: {
        backgroundColor: partyHex,
        width: barWidth + "px",
      },
      numStyle: {
        color: partyHex,
      },
    };
  },
  methods: {
    initialWidth() {
      if (window.innerWidth > 1060) {
        return 320;
      } else if (window.innerWidth > 810) {
        return 386;
      } else if (window.innerWidth > 510) {
        return 488;
      } else if (window.innerWidth > 320) {
        return 338;
      } else {
        return 288;
      }
    },
    myEventHandler() {
      //this.$nextTick(() => console.log(this.$refs.getWidth.clientWidth));
      //console.log(this.$refs.getWidth.clientWidth);
      let partyHex = this.$t(this.currentView + "." + this.party + "-colour");
      let barWidth =
        (this.partyNum / this.max) * this.getMaxBar(this.initialWidth());
      this.barStyle = {
        backgroundColor: partyHex,
        width: barWidth + "px",
      };
    },
    getMaxBar(width) {
      switch (width) {
        case 320:
          return 174;
        case 386:
          return 240;
        case 488:
          return 340;
        case 338:
          return 193;
        case 288:
          return 142;
      }
    },
    getImgSrc() {
      let src = require("../assets/partyLogos/" +
        this.currentView +
        "/" +
        this.party +
        ".png");
      return src;
    },
  },
};
</script>
<style scoped>
.infoBox {
  width: 31%;
  display: flex;
  font-weight: bold;
  margin: 5px;
  padding: 5px;
  border: solid 1px lightgray;
  border-radius: 5px;
  background: #eeeeee;
}
.smallPartyLogo {
  overflow: hidden;
  border-radius: 50%;
  min-height: 50px;
  max-width: 50px;
  min-width: 50px;
}
.smallPartyLogo {
  width: 30px;
  height: 30px;
  object-fit: cover;
}
.partyInfoTable {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 15px;
}
.partyInfoNum {
  font-size: 25px;
  width: 67px;
  text-align: left;
}
.partyInfoGraph {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
}
.colouredBar {
  width: 180px;
  border-radius: 5px;
}
@media only screen and (max-width: 1060px) {
  .infoBox {
    width: 47%;
  }
}
@media only screen and (max-width: 810px) {
  .infoBox {
    width: 100%;
  }
}
</style>
