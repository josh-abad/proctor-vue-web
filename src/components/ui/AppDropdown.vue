<template>
  <div>
    <div class="relative mt-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="relative w-full py-2 pl-3 pr-10 text-left bg-gray-100 border border-gray-300 rounded-md shadow-sm appearance-none cursor-default dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-green-500 focus:border-green-500 sm:text-sm"
        @click.prevent="open = !open"
      >
        <span class="flex items-center">
          <span class="block ml-3 truncate">{{ selectedText }}</span>
        </span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none"
        >
          <!-- Heroicon name: selector -->
          <svg
            class="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      <transition name="dropdown-fade">
        <div
          class="absolute w-full mt-1 bg-gray-100 bg-opacity-50 border border-gray-800 rounded-md shadow-lg dark:bg-gray-900 dark:bg-opacity-75 backdrop-filter backdrop-blur dark:border-gray-100 border-opacity-10 dark:border-opacity-10"
          v-show="open"
        >
          <ul
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            class="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-gray-900 ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
            <li
              id="listbox-item-0"
              role="option"
              class="relative py-2 pl-3 text-gray-900 cursor-default select-none group dark:text-white pr-9 hover:bg-gray-300 dark:hover:bg-gray-700 hover:bg-opacity-40 dark:hover:bg-opacity-40"
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
                  {{ option.text || "" }}
                </span>
              </div>

              <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"
          -->
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600"
                v-show="selectedIndex === i"
              >
                <!-- Heroicon name: check -->
                <svg
                  class="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppDropdown',
  props: {
    modelValue: {
      type: String,
      default: ''
    },

    options: {
      type: Array as () => Option[],
      required: true
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      open: false,
      selectedIndex: 0
    }
  },
  computed: {
    selectedText (): string {
      const selected: Option = this.options[this.selectedIndex] as Option
      return selected ? selected.text : ''
    }
  },
  mounted () {
    this.$emit('update:modelValue', (this.options[this.selectedIndex] as Option).value)
  },
  methods: {
    handleChange (i: number): void {
      this.selectedIndex = i
      this.$emit('update:modelValue', (this.options[this.selectedIndex] as Option).value)
    }
  }
})
</script>
