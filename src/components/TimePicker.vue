<template>
  <div class="flex items-center space-x-1">
    <NumberInput id="hour" v-model.number="hour" :min="0" :max="2" pad />
    <label for="hour" class="text-xs font-semibold text-gray-500">H</label>
    <div>:</div>
    <NumberInput id="minute" v-model.number="minute" :min="0" :max="59" pad />
    <label for="minute" class="text-xs font-semibold text-gray-500">M</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NumberInput from './ui/NumberInput.vue'

export default defineComponent({
  components: { NumberInput },
  name: 'TimePicker',
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      hour: 1,
      minute: 0
    }
  },
  computed: {
    seconds(): number {
      return this.hour * 3600 + this.minute * 60
    }
  },
  watch: {
    seconds(newValue: number) {
      this.$emit('update:modelValue', newValue)
    }
  },
  created() {
    if (this.modelValue !== 0) {
      this.hour = Math.floor(this.modelValue / 3600)
      this.minute = Math.floor((this.modelValue % 3600) / 60)
    }
  }
})
</script>
