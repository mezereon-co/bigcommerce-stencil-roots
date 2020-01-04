/* global mz */
import { mapState } from 'vuex'

export default {
  name: 'Hits',
  computed: {
    ...mapState('search', [
      'primaryKey',
      'hits',
      'queryId',
      'page',
      'pageSize',
      'layout',
      'toggleLayout',
      'context'
    ])
  },
  methods: {
    trackEvent(item, index, type = 'click') {
      if (mz && mz.track) {
        mz.track(type, {
          queryId: this.queryId,
          uid: item[this.primaryKey] + '',
          pos: (this.page - 1) * this.pageSize + index + 1
        })
      }
    },
    trackClick(item, index) {
      this.trackEvent(item, index, 'click')
    }
  }
}
