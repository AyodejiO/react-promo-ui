<template>
  <b-card header="Track plays by location">
    <div class="w-100 mapchart" ref="chartdiv" style="min-height: 450px;"></div>
  </b-card>
</template>
<script>
import { mapGetters } from 'vuex'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)

export default {
  name: 'FeedbacksMap',
  computed: {
    ...mapGetters({
      tracks: 'Tracks/tracks'
    })
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  data () {
    return {
      chart: null,
      polygonSeries: null
    }
  },
  methods: {
    toggleSlice (item) {
      var slice = this.pieSeries.dataItems.getIndex(item)
      if (slice.visible) {
        slice.hide()
      } else {
        slice.show()
      }
    },
    hoverSlice (item) {
      var slice = this.pieSeries.slices.getIndex(item)
      slice.isHover = true
    },
    blurSlice (item) {
      var slice = this.pieSeries.slices.getIndex(item)
      slice.isHover = false
    }
  },
  mounted () {
    this.chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart)
    this.chart.minHeight = 450
    this.chart.geodata = am4geodataWorldLow

    this.chart.projection = new am4maps.projections.Miller()

    this.polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries())

    // Make map load polygon (like country names) data from GeoJSON
    this.polygonSeries.useGeodata = true

    // Configure series
    var polygonTemplate = this.polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = '{name}'
    polygonTemplate.fill = am4core.color('#74B266')

    this.chart.logo.disabled = true
    // this.chart.legend = new am4charts.Legend()
  }
}
</script>
<style>
  .mapchart > div:first-child {
    height: 450px !important;
  }
</style>
