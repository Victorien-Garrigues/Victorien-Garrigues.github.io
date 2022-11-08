<template>
  <div>
    <div class="chartBox" style="padding-bottom: 20px">
      <div class="forecastGrid">
        <div>
          <div class="smallTitle textBox">
            If an election were held tomorrow
          </div>
          <div class="textBox">
            While the Liberal party (LPC) is trending behind the Conservative
            party (CPC) in opinion polls it is still favoured to win a majority
            of seats. This is because despite the Conversatives and New
            Democrats (NDP) picking up a few seats, Montreal and Toronto remain
            Liberal strongholds. Meanwhile support for the Bloc Québécois (BQ)
            remains relatively unchanged since the last election. The Green
            party (GPC) has made minor gains while the People's party (PPC) has
            been losing votes to the Conservatives for months.
          </div>
        </div>
        <div class="partyMargins">
          <div v-if="forecastLink == 0">
            <iframe
              width="600"
              height="371"
              seamless
              frameborder="0"
              scrolling="no"
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=1285493608&amp;format=interactive"
            ></iframe>
          </div>
          <div v-if="forecastLink == 1">
            <iframe
              width="459"
              height="377"
              seamless
              frameborder="0"
              scrolling="no"
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=238324196&amp;format=interactive"
            ></iframe>
          </div>
          <div v-if="forecastLink == 2">
            <iframe
              width="319"
              height="326"
              seamless
              frameborder="0"
              scrolling="no"
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=1902713454&amp;format=interactive"
            ></iframe>
          </div>
          <div v-if="forecastLink == 3">
            <iframe
              width="278"
              height="285"
              seamless
              frameborder="0"
              scrolling="no"
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSHdxj1KPFMHP5gT1ybNfd_-N_7QikiUQ1zMKJgGb4xZjwPY4DcRE6xjWHlWqgbhawjk8ZO6I52MakV/pubchart?oid=440388379&amp;format=interactive"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="smallTitle textBox">Change since last election</div>
      <div class="textBox">
        Liberals are projected to lose 12 seats since the last Federal election
        in 2021. Every other party is projected to either gain seats or have
        little to no change.
      </div>
      <div class="smallText">2021 election results</div>
      <div class="seatRow">
        <SeatProjection
          v-for="index of indexCount"
          :electionValue="previousElection[index]"
          :electionParty="electionParties[index]"
          :difference="nextElection[index] - previousElection[index]"
          :currentView="currentView"
          :flip="true"
          :key="index"
        />
      </div>
      <div class="seatRow">
        <SeatProjection
          v-for="index of indexCount"
          :electionValue="nextElection[index]"
          :electionParty="electionParties[index]"
          :difference="nextElection[index] - previousElection[index]"
          :currentView="currentView"
          :flip="false"
          :key="index"
        />
      </div>
      <div class="smallText">Current seat projections</div>
    </div>
  </div>
</template>
<script>
import SeatProjection from "../components/SeatProjection.vue";

export default {
  name: "ForecastGraph",
  components: {
    SeatProjection,
  },
  props: {
    currentView: String,
  },
  created() {
    window.addEventListener("resize", this.changeGraphLink);
  },
  destroyed() {
    window.removeEventListener("resize", this.changeGraphLink);
  },
  data() {
    const electionParties = ["LPC", "CPC", "NDP", "BQ", "GPC"];
    const previousElection = [160, 119, 25, 32, 2];
    const nextElection = [148, 128, 28, 31, 3];
    const indexCount = [0, 1, 2, 3, 4];

    return {
      forecastLink: this.changeGraphLink(),
      electionParties: electionParties,
      previousElection: previousElection,
      nextElection: nextElection,
      indexCount: indexCount,
    };
  },
  methods: {
    changeGraphLink() {
      if (window.innerWidth > 810) {
        this.forecastLink = 0;
      } else if (window.innerWidth > 510) {
        this.forecastLink = 1;
      } else if (window.innerWidth > 320) {
        this.forecastLink = 2;
      } else {
        this.forecastLink = 3;
      }
      return this.forecastLink;
    },
  },
};
</script>
<style>
.forecastGrid {
  display: flex;
  align-items: center;
  justify-content: center;
}
.partyMargins {
  width: 620px;
}
.textBox {
  padding: 5px 20px;
  text-align: left;
  font-size: 18px;
}
.smallText {
  padding: 0 20px;
  font-size: 14px;
}
.smallTitle {
  font-weight: bold;
  font-size: 20px;
  padding-top: 15px;
}
.seatRow {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
}
@media only screen and (max-width: 1060px) {
  .forecastGrid {
    flex-direction: column;
  }
}
</style>
