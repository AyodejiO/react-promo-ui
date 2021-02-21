<template>
  <b-card header="Track plays by location">
    <div class="w-100 mapchart" ref="chartdiv" style="min-height: 450px;"></div>
  </b-card>
</template>
<script>
import { mapGetters } from 'vuex'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodataWorldsLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)

export default {
  name: 'FeedbacksMap',
  computed: {
    ...mapGetters({
      geoips: 'Feedbacks/geoips'
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
      imageSeries: null,
      polygonSeries: null,
      polygonTemplate: null
    }
  },
  methods: {
    animateBullet (circle) {
      let animation = circle.animate([{ property: 'scale', from: 1, to: 5 }, { property: 'opacity', from: 1, to: 0 }], 1000, am4core.ease.circleOut)
      animation.events.on('animationended', function (event) {
        this.animateBullet(event.target.object)
      })
    }
  },
  mounted () {
    this.chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart)
    this.chart.minHeight = 450
    this.chart.geodata = am4geodataWorldsLow

    this.chart.projection = new am4maps.projections.Miller()

    this.polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries())
    this.polygonSeries.exclude = ['AQ']

    // Make map load polygon (like country names) data from GeoJSON
    this.polygonSeries.useGeodata = true

    // Configure series
    this.polygonTemplate = this.polygonSeries.mapPolygons.template
    this.polygonTemplate.tooltipText = '{name}'
    this.polygonTemplate.fill = am4core.color('#866df5')

    let hs = this.polygonTemplate.states.create('hover')
    hs.properties.fill = this.chart.colors.getIndex(0)

    // Add image series
    this.imageSeries = this.chart.series.push(new am4maps.MapImageSeries())
    this.imageSeries.mapImages.template.propertyFields.longitude = 'lon'
    this.imageSeries.mapImages.template.propertyFields.latitude = 'lat'
    this.imageSeries.mapImages.template.tooltipText = '{city}'
    this.imageSeries.mapImages.template.propertyFields.url = 'url'

    let circle = this.imageSeries.mapImages.template.createChild(am4core.Circle)
    circle.radius = 3
    circle.propertyFields.fill = 'color'

    let circle2 = this.imageSeries.mapImages.template.createChild(am4core.Circle)
    circle2.radius = 3
    circle2.propertyFields.fill = 'color'

    function animateBullet (circle) {
      let animation = circle.animate([{ property: 'scale', from: 1, to: 3 }, { property: 'opacity', from: 1, to: 0 }], 800, am4core.ease.circleOut)
      animation.events.on('animationended', function (event) {
        animateBullet(event.target.object)
      })
    }

    circle2.events.on('inited', function (event) {
      animateBullet(event.target)
    })

    this.chart.logo.disabled = true
    // this.chart.legend = new am4charts.Legend()

    this.imageSeries.data = this.geoips
  }
}
</script>
<style>
  .mapchart > div:first-child {
    height: 450px !important;
  }
</style>
