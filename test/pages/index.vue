<template>
  <NuxtLayout>
    <div class="mt-3 mb-3 text-center text-h5 font-weight-bold">
      <h2>豊橋市東部</h2>
    </div>
    <v-table class="mb-5" dense>
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

    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" md="6" v-for="station in stations" :key="station">
          <nuxt-link :to="{
            name: 'station',
            query: { id: station.id, station: station.name, rainfalls: station.rainfalls, area: station.area },
          }" class="nuxt-link--no-underline">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card v-bind="props" :color="isHovering ? 'info' : undefined" :class="getBackgroundColor(station.rainfalls)">
                  <v-card-text>
                   <div class="mt-1 text-left">
                      <v-row>
                      <!--<v-col cols="3" sm="3" md="3" lg="3" xl="3" id="area_font" class="text-body-1 text-medium-emphasis font-weight-bold text-center text-fluid"><span>{{station.area }}</span></v-col>-->
                      <v-col cols="6" sm="6" md="6" lg="6" xl="6" id="name_font" class="text-h6 font-weight-bold"><span >{{ station.name }}</span></v-col>
                      <v-col cols="6" sm="6" md="6" lg="6" xl="6" id="rainfall_font" class="text-h6 font-weight-bold text-center"><span >{{ station.rainfalls }}mm/h</span></v-col>
                      </v-row>
                   </div>
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";

const stations = ref([
  { area: "浅野", id: 56, name: "平山池", rainfalls: 0 },
]);

const getBackgroundColor = (rainfall) => {

  if (rainfall >= 40) {
    return "bg-black";
  } else if (rainfall >= 35) {
    return "bg-purple";
  } else if (rainfall >= 30) {
    return "bg-red";
  } else if (rainfall >= 20) {
    return "bg-yellow";
  } else {
    return "bg-white";
  }

};


onMounted(async () => {
  await loadStations();
})
const loadStations = async () => {
  const { data: res } = await api('/rainfalls_latest/2', {});
  console.log(res.value.body)
  JSON.parse(res.value.body).forEach((station) => {
    console.log(station.station_id)
    const index = stations.value.findIndex((s) => s.id === station.station_id);
    if (index !== -1) {
      stations.value[index].rainfalls = station.hour1;
    }
  });
}
</script>
<style>
.rain {
  font-size: 10px;
}

.v-table--density-default>.v-table__wrapper>table>tbody>tr>td,
.v-table--density-default>.v-table__wrapper>table>thead>tr>td,
.v-table--density-default>.v-table__wrapper>table>tfoot>tr>td {
  height: calc(var(--v-table-row-height, 32px) + 0px);
}

.nuxt-link--no-underline,
.nuxt-link--no-underline:hover {
  text-decoration: none !important;
}

.bg-light-blue {
  background-color: #add8e6;
}

.bg-green {
  background-color: #008000;
}

.bg-yellow {
  background-color: #ffff00;
}

.bg-orange {
  background-color: #ffa500;
}

.bg-red {
  background-color: #ff0000;
}

.bg-purple {
  background-color: #6c0f6c;
}

.bg-black {
  background-color: #000;
}

.bg-white {
  background-color: #fff;
}
</style>
