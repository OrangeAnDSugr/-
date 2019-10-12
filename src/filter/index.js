import Vue from 'vue'

import moment from 'moment'

Vue.filter('date', (input, formatStr = 'YYYY-MM-DD hh:mm:ss') => {
  return moment(input).format(formatStr)
})
