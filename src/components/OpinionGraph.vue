<template>
  <div>
    <!-- <div>{{ currentView }} opinion polls</div> -->
    <div class="partyInfoBox">
      <PartyInfo
        v-for="party of data[0]"
        :party="party"
        :currentView="currentView"
        :partyNum="Math.round(data[1][data[0].indexOf(party)])"
        :max="Math.round(Math.max(...data[1]))"
        :key="party"
      />
    </div>
    <!--partyNums.get(party)-->
    <div class="chartBox scrollChart">
      <div class="smallTitle" style="width: 100%">
        Opinion polls since last election
      </div>
      <div v-if="opinionLink == 0">
        <iframe
          width="966"
          height="724"
          seamless
          frameborder="0"
          scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=1682798475&amp;format=interactive"
        ></iframe>
      </div>
      <div v-if="opinionLink == 1">
        <iframe
          width="742"
          height="556"
          seamless
          frameborder="0"
          scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=1685398086&amp;format=interactive"
        ></iframe>
      </div>
      <div v-if="opinionLink == 2">
        <iframe
          width="482"
          height="450"
          seamless
          frameborder="0"
          scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=1733907537&amp;format=interactive"
        ></iframe>
      </div>
      <div v-if="opinionLink == 3">
        <iframe
          width="330"
          height="370"
          seamless
          frameborder="0"
          scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=1484963052&amp;format=interactive"
        ></iframe>
      </div>
      <div v-if="opinionLink == 4">
        <iframe
          width="284"
          height="370"
          seamless
          frameborder="0"
          scrolling="no"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=722368522&amp;format=interactive"
        ></iframe>
      </div>
    </div>
    <!-- <GChart type="LineChart" :options="options" :data="data" /> -->
  </div>
</template>
<script>
// import { GChart } from "vue-google-charts";
import PartyInfo from "../components/PartyInfo.vue";
//import cheerio from "cheerio";
import axios from "axios";

export default {
  name: "OpinionGraph",
  components: {
    // GChart,
    PartyInfo,
  },
  created() {
    window.addEventListener("resize", this.changeGraphLink);
  },
  destroyed() {
    window.removeEventListener("resize", this.changeGraphLink);
  },
  props: {
    currentView: String,
  },
  data() {
    let dataList = [[], []];

    return {
      opinionLink: this.changeGraphLink(),
      data: dataList,
      options: {
        interpolateNulls: true,
        aggregationTarget: "category",
        backgroundColor: "#e8e8e8",
        focusTarget: "category",
        series: {
          0: { color: "#0F2D52" },
          1: { color: "#D71921" },
          2: { color: "#F58220" },
          3: { color: "#00A7EC" },
          4: { color: "#442D7B" },
          5: { color: "#3C9B35" },
        },
        boxStyle: {
          stroke: "#888",
          strokeWidth: 1,
          rx: 5,
          ry: 5,
        },
        legend: { position: "none" },
        hAxis: { textPosition: "none" },
        annotations: {
          style: "line",
        },
        curveType: "function",
        chart: {
          title: "Federal Polls",
          subtitle: "In percentage",
        },
        width: 1000,
        height: 600,
      },
    };
  },
  mounted() {
    axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubhtml?gid=1804583268&single=true"
      )
      .then((response) => (this.data = this.parseData(response.data)));
    //.then((response) => (this.data = this.parseImg(response.data)));
  },
  methods: {
    changeGraphLink() {
      if (window.innerWidth > 1060) {
        this.opinionLink = 0;
      } else if (window.innerWidth > 810) {
        this.opinionLink = 1;
      } else if (window.innerWidth > 510) {
        this.opinionLink = 2;
      } else if (window.innerWidth > 320) {
        this.opinionLink = 3;
      } else {
        this.opinionLink = 4;
      }
      return this.opinionLink;
    },
    parseData(data) {
      //console.log(data);
      //var returnData = [["CPC", "LPC", "NDP", "BQ", "PPC", "GPC"]];
      var returnData = [];
      // var dataCap = returnData[0].length;
      // var indexCounter = 0;
      data = data.substring(data.indexOf("Mapoll : ExportTable"));
      var table = data.split(/<.*?>/);
      var step = 0;
      for (var item of table) {
        if (item == "Published by ") {
          console.log(returnData);
          return returnData;
        }
        if (!item.length == 0) {
          if (
            item == "Party" ||
            item == "Poll" ||
            item == "Seat" ||
            item == "-low" ||
            item == "-high"
          ) {
            if (step > 0) {
              returnData[step - 1].pop();
            }
            returnData.push([]);
            step++;
          } else if (step > 0) {
            returnData[step - 1].push(item);
          }
        }
      }
      return returnData;
    },
    toInt(value) {
      if (value.includes("*")) value = value.substring(1, value.length - 1);
      return parseInt(value);
    },
    parseImg(data) {
      console.log(data);
      return null;
    },
  },
};
</script>
<style scoped>
.partyInfoBox {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: space-between;
}
.smallTitle {
  color: #2c3e50;
  font-size: 30px;
  font-weight: bold;
  font-family: Merriweather, serif;
  margin-top: 10px;
}
/* .scrollChart {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: auto;
} */
#oGraph {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 966px;
}
@media only screen and (max-width: 1060px) {
  #oGraph {
    width: 788px;
  }
}
@media only screen and (max-width: 810px) {
}
</style>
