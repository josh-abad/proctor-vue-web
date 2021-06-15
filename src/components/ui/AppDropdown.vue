<template>
  <div>
    <div class="relative mt-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @click.prevent="open = !open"
      >
        <span class="flex items-center">
          <span class="block ml-3 truncate">{{ selectedText }}</span>
        </span>
        <span class="selector-icon">
          <SelectorIcon class="w-5 h-5 text-gray-400" />
        </span>
      </button>
      <transition name="dropdown-fade">
        <div class="dropdown" v-show="open">
          <ul
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
          >
            <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
            <li
              class="group"
              id="listbox-item-0"
              role="option"
              v-for="(option, i) in options"
              :key="i"
              @click="handleChange(i)"
            >
              <div class="flex items-center">
                <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                <span
                  class="block ml-3 truncate"
                  :class="selectedIndex === i ? 'font-semibold' : 'font-normal'"
                >
                  {{ option.text || '' }}
                </span>
              </div>

              <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"
          -->
              <span class="check-icon" v-show="selectedIndex === i">
                <CheckIcon class="w-5 h-5 fill-current" />
              </span>
            </li>

            <!-- More options... -->
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Option } from '@/types'
import { defineComponent, PropType } from 'vue'
import { SelectorIcon, CheckIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'AppDropdown',
  components: { SelectorIcon, CheckIcon },
  props: {
    modelValue: {
      type: String,
      default: ''
    },

    options: {
      type: Array as PropType<Option[]>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      open: false,
      selectedIndex: 0
    }
  },
  computed: {
    selectedText(): string {
      const selected: Option = this.options[this.selectedIndex] as Option
      return selected ? selected.text : ''
    }
  },
  mounted() {
    this.$emit(
      'update:modelValue',
      (this.options[this.selectedIndex] as Option).value
    )
  },
  methods: {
    handleChange(i: number) {
      this.selectedIndex = i
      this.$emit(
        'update:modelValue',
        (this.options[this.selectedIndex] as Option).value
      )
    }
  }
})
</script>

<style lang="postcss" scoped>
button {
  @apply relative w-full py-2 pl-3 pr-10 text-left bg-gray-100 border border-gray-300 rounded-md shadow-sm appearance-none cursor-default dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-green-500 focus:border-green-500 sm:text-sm;
}

ul {
  @apply py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-gray-900 ring-opacity-5 focus:outline-none sm:text-sm;
}

li {
  @apply relative py-2 pl-3 text-gray-900 cursor-default select-none dark:text-white pr-9 hover:bg-gray-300 dark:hover:bg-gray-600 hover:bg-opacity-40 dark:hover:bg-opacity-40;
}

.selector-icon,
.check-icon {
  @apply absolute inset-y-0 right-0 flex items-center;
}

.selector-icon {
  @apply pr-2 ml-3 pointer-events-none;
}

.check-icon {
  @apply pr-4 text-green-600;
}

.dropdown {
  @apply absolute w-full mt-1 bg-gray-100 rounded-md shadow-lg dark:bg-gray-700;
}
</style>
