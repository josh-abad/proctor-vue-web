<template>
  <div>
    <div class="flex">
      <div class="flex-grow">
        <CalendarMonth v-model="value" :events="events" />
      </div>
      <BasePanel class="ml-4 w-80" v-show="value">
        <div class="flex justify-between items-start">
          <div
            class="uppercase text-xs tracking-wider font-semibold text-gray-500"
          >
            {{ date }}
          </div>
          <button class="focus:outline-none" @click="value = null">
            <!-- Heroicon name: x -->
            <svg
              class="fill-current text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="font-semibold text-lg">Events</div>
        <div>
          <div
            v-for="(event, i) in eventsOnDate"
            :key="i"
            class="flex items-center"
          >
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <!-- Heroicon name: lock-open -->
              <path
                v-if="event.action === 'opens'"
                d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
              />
              <!-- Heroicon name: lock-closed -->
              <path
                v-else
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="ml-2">
              <div class="text-gray-700 dark:text-gray-300">
                <router-link
                  :to="event.subjectUrl"
                  class="text-gray-900 dark:text-white"
                  >{{ event.subject }}</router-link
                >
                {{ event.action }}
              </div>
              <router-link
                :to="event.locationUrl"
                class="block text-xs uppercase font-semibold tracking-wider text-gray-500"
              >
                {{ event.location }}
              </router-link>
            </div>
          </div>
        </div>
      </BasePanel>
    </div>
  </div>
</template>

<script lang="ts">
import BasePanel from '@/components/BasePanel.vue'
import CalendarMonth from '@/components/CalendarMonth.vue'
import { AppEvent } from '@/types'
import dayjs from 'dayjs'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalendarPage',
  components: { CalendarMonth, BasePanel },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    events (): AppEvent[] {
      return this.$store.getters.examEvents
    },
    eventsOnDate (): AppEvent[] {
      return this.events.filter(event => this.dateSame(event.date))
    },
    date (): string {
      return dayjs(this.value).format('MMMM D, YYYY')
    }
  },
  methods: {
    dateSame (d: Date): boolean {
      return this.value === dayjs(d).format('YYYY-MM-DD')
    }
  }
})
</script>
