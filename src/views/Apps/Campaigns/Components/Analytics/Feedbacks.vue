<template>
  <div>
    <b-card header="Feedbacks">
      <b-table striped hover :items="feedbacks" :fields="fields">
        <!-- A custom formatted column -->
        <template #cell(created_at)="data">
          {{ data.value | moment("from", "now") }}
        </template>

        <template #cell(rating)="data">
          <b-form-rating id="rating-inline" size="sm" inline :value="data.value" class="border-0" variant="success" disabled></b-form-rating>
        </template>
      </b-table>
    </b-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Feedbacks',
  computed: {
    ...mapGetters({
      feedbacks: 'Feedbacks/feedbacks'
    })
  },
  data () {
    return {
      fields: [
        {
          key: 'user_type',
          label: 'Type',
          sortable: true
        },
        {
          key: 'username',
          label: 'Username',
          sortable: true
        },
        {
          key: 'fave_track',
          label: 'Favorite Track',
          sortable: true
        },
        {
          key: 'rating',
          label: 'Rating',
          sortable: true
        },
        {
          key: 'remark',
          label: 'Remark'
        }
      ]
    }
  }
}
</script>
