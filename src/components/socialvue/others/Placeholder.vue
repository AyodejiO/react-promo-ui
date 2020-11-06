<template>
    <b-img :width="width" :height="height" :class="className" alt="placeholder" :src="imageUrl"></b-img>
</template>
<script>
export default {
  name: 'Placeholder',
  props: {
    className: { type: String, default: '' },
    width: { type: String, default: '200' },
    height: { type: String, default: '200' },
    url: { type: String, default: null },
    text: { type: String, default: '' },
    bgcolor: { type: String, default: 'cccccc' },
    textcolor: { type: String, default: '' }
  },
  mounted () {
  },
  computed: {
    imageUrl: function () {
      if (this.url) return this.url
      let theUrl = 'http://via.placeholder.com/' + this.width + 'x' + this.height

      if (this.bgcolor) theUrl += '/' + this.bgcolor
      if (this.textcolor) theUrl += '/' + this.textcolor
      if (this.text) theUrl += '?text=' + encodeURIComponent(this.text)

      return theUrl
    }
  }
}
</script>
