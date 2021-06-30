<template>
  <div class="relative mt-1">
    <button
      class="
        relative
        py-2
        pr-10
        pl-3
        w-full
        text-left
        bg-gray-100
        rounded-md
        border border-gray-300
        shadow-sm
        appearance-none
        cursor-default
        sm:text-sm
        dark:bg-gray-800
        dark:border-gray-700
        focus:border-green-500
        focus:ring-0 focus:ring-green-500
        focus:outline-none
      "
      type="button"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      @click.prevent="open = !open"
    >
      <span class="flex items-center">
        <span class="block ml-3 truncate">{{ selectedText }}</span>
      </span>
      <span
        class="
          flex
          absolute
          inset-y-0
          right-0
          items-center
          pr-2
          ml-3
          pointer-events-none
        "
      >
        <SelectorIcon class="w-5 h-5 text-gray-400" />
      </span>
    </button>
    <DropdownFadeTransition>
      <div
        class="
          absolute
          mt-1
          w-full
          bg-gray-100
          rounded-md
          shadow-lg
          dark:bg-gray-700
        "
        v-show="open"
      >
        <ul
          class="
            overflow-auto
            py-1
            max-h-56
            text-base
            rounded-md
            ring-1 ring-gray-900 ring-opacity-5
            sm:text-sm
            focus:outline-none
          "
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
        >
          <li
            class="
              relative
              py-2
              pr-9
              pl-3
              text-gray-900
              cursor-default
              select-none
              dark:text-white
              hover:bg-gray-300 hover:bg-opacity-40
              group
              dark:hover:bg-gray-600 dark:hover:bg-opacity-40
            "
            id="listbox-item-0"
            role="option"
            v-for="(option, i) in options"
            :key="i"
            @click="handleChange(i)"
          >
            <div class="flex items-center">
              <span
                class="block ml-3 truncate"
                :class="selectedIndex === i ? 'font-semibold' : 'font-normal'"
              >
                {{ option.text || '' }}
              </span>
            </div>
            <span
              class="
                flex
                absolute
                inset-y-0
                right-0
                items-center
                pr-4
                text-green-600
              "
              v-show="selectedIndex === i"
            >
              <CheckIcon class="w-5 h-5 fill-current" />
            </span>
          </li>
        </ul>
      </div>
    </DropdownFadeTransition>
  </div>
</template>

<script lang="ts">
import { Option } from '@/types'
import { defineComponent, PropType } from 'vue'
import { SelectorIcon, CheckIcon } from '@heroicons/vue/solid'
import DropdownFadeTransition from '../transitions/DropdownFadeTransition.vue'

export default defineComponent({
  name: 'AppDropdown',
  components: { SelectorIcon, CheckIcon, DropdownFadeTransition },
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
