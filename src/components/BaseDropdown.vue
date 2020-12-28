<template>
  <div>
    <div class="mt-1 relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="relative w-full bg-white border border-gray-300 dark:bg-gray-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
        @click.prevent="open = !open"
      >
        <span class="flex items-center">
          <span class="ml-3 block truncate">{{
            options[selectedIndex].text
          }}</span>
        </span>
        <span
          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <!-- Heroicon name: selector -->
          <svg
            class="h-5 w-5 text-gray-400"
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

      <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <transition
        enter-active-class=""
        enter-from-class=""
        enter-to-class=""
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg"
          v-show="open"
        >
          <ul
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
            <li
              id="listbox-item-0"
              role="option"
              class="text-gray-900 dark:text-white cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-green-600"
              v-for="(option, i) in options"
              :key="i"
              @click="handleChange(i)"
            >
              <div class="flex items-center">
                <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                <span
                  class="ml-3 block truncate"
                  :class="selectedIndex === i ? 'font-semibold' : 'font-normal'"
                >
                  {{ option.text }}
                </span>
              </div>

              <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"
          -->
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-white dark:hover:text-white text-green-600 dark:text-green-600"
                v-show="selectedIndex === i"
              >
                <!-- Heroicon name: check -->
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
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
  name: 'BaseDropdown',
  emits: ['selection-change'],
  data () {
    return {
      open: false,
      selectedIndex: 0
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  mounted () {
    this.$emit('selection-change', (this.options[this.selectedIndex] as Option).value)
  },
  methods: {
    handleChange (i: number): void {
      this.selectedIndex = i
      this.$emit('selection-change', (this.options[this.selectedIndex] as Option).value)
    }
  }
})
</script>
