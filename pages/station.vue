<template>
  <NuxtLayout>
    <h1 class="text-center text-h4 font-weight-bold">{{ stationName }}</h1>
    <h3 class="text-center text-h6 font-weight-bold">現在の雨の強さ</h3>


    <v-table class="mt-5">
      <tbody>
        <tr>
          <th class="text-h6 font-weight-bold text-center" >10分間</th>
          <td class="text-h5 font-weight-bold text-center" :class="getColorForRainfall(1, rainfalls1)">{{ rainfalls1 }} mm</td>
        </tr>
        <tr>
          <th class="text-h6 font-weight-bold text-center">1時間</th>
          <td class="text-h5 font-weight-bold text-center" :class="getColorForRainfall(2, rainfalls)">{{ rainfalls }} mm</td>
        </tr>
        <tr>
          <th class="text-h6 font-weight-bold text-center">24時間</th>
          <td class="text-h5 font-weight-bold text-center" :class="getColorForRainfall(3, rainfalls3)">{{ rainfalls3 }} mm</td>
        </tr>
      </tbody>
    </v-table>


    <v-table class="mt-5" dense>
      <tbody>
          <tr>
          <td class="rain text-center py-1 text-subtitle-1 font-weight-black" :style="{ backgroundColor: '#ffffff' }">通常
          </td>
          <td class="rain text-center py-1 text-subtitle-1 font-weight-black" :style="{ backgroundColor: '#ffff00' }">注意
          </td>
          <td class="rain text-center py-1 text-subtitle-1 font-weight-black" :style="{ color: '#fff', backgroundColor: '#ff0000' }">警戒
          </td>
          <td class="rain text-center py-1 text-subtitle-1 font-weight-black" :style="{ color: '#fff', backgroundColor: '#6c0f6c' }">危険
          </td>
          <td class="rain text-center py-1 text-subtitle-1 font-weight-black" :style="{ color: '#fff', backgroundColor: '#000' }">切迫
          </td>
        </tr>
      </tbody>
    </v-table>


    <v-row class="mt-5">
      <v-col class="text-center">
        <v-btn href="https://www.jma.go.jp/bosai/#area_type=class20s&area_code=3820100&pattern=default" target="_blank" class="text-h5 font-weight-bold">
          気象庁からのお知らせ
        </v-btn>
      </v-col>
      <v-col class="text-center">
        <v-btn href="https://city-matsuyama.my.salesforce-sites.com/" target="_blank" class="text-h5 font-weight-bold">
          市役所からのお知らせ
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-5 justify-center">
     <v-col cols="auto">
      <v-btn block :to="'/'" class="text-h5 font-weight-bold">
          全体に戻る
      </v-btn>
    </v-col>
    </v-row>
  </NuxtLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(route.query.id || "")
const areaName = ref(route.query.area || "")
const stationName = ref(route.query.station || "")
const rainfalls = ref(0)
const rainfalls1 = ref(0)
const rainfalls3 = ref(0)

onMounted(async () => {
  await loadStations();
})
const loadStations = async () => {
  const { data: res } = await api('/rainfalls_latest/92', {});
  JSON.parse(res.value.body).forEach((station) => {
    if (station.station_id == id.value) {
      rainfalls1.value = station.min10;
      rainfalls.value = station.hour1;
      rainfalls3.value = station.day1;
    }
  });
}
const getColorForRainfall = (no, mm) => {

  if (no === 1) {
    if (mm >= 20) {
      return "bg-black";
    } else if (mm >= 17.5) {
      return "bg-purple";
    } else if (mm >= 15) {
      return "bg-red";
    } else if (mm >= 10) {
      return "bg-yellow";
    } else {
      return "bg-white";
    }
  } else if (no == 2) {
    if (mm >= 40) {
      return "bg-black";
    } else if (mm >= 35) {
      return "bg-purple";
    } else if (mm >= 30) {
      return "bg-red";
    } else if (mm >= 20) {
      return "bg-yellow";
    } else {
      return "bg-white";
    }
  } else if (no == 3) {
    if (mm >= 190) {
      return "bg-black";
    } else if (mm >= 165) {
      return "bg-purple";
    } else if (mm >= 140) {
      return "bg-red";
    } else if (mm >= 80) {
      return "bg-yellow";
    } else {
      return "bg-white";
    }
  }
}
</script>
<style scoped>
.bold-text {
  font-weight: bold;
}

.rain {
  font-size: 10px;
}

.v-table--density-default>.v-table__wrapper>table>tbody>tr>td,
.v-table--density-default>.v-table__wrapper>table>thead>tr>td,
.v-table--density-default>.v-table__wrapper>table>tfoot>tr>td {
  height: calc(var(--v-table-row-height, 32px) + 0px);
}

.bg-light-blue {
  background-color: #add8e6;
}

.bg-green {
  background-color: #008000;
}

.bg-yellow {
  background-color: #ffff00;
  color: #444;
  font-weight: bold;
}

.bg-orange {
  background-color: #ffa500;
}

.bg-red {
  background-color: #ff0000;
  color: #fff;
  font-weight: bold;
}

.bg-purple {
  background-color: #6c0f6c;
  color: #fff;
  font-weight: bold;
}

.bg-black {
  background-color: #000;
  color: #fff;
  font-weight: bold;
}

.bg-white {
  background-color: #fff;
}
</style>