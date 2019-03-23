<template>
	<div class="a">123</div>
</template>

<script>
export default {
  name: 'a',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

  }
}
</script>

<style>
</style>
