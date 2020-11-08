<template>
  <iq-card body-class="p-0">
    Track
  </iq-card>
</template>
<script>
export default {
  name: 'Track',
  props: [
    'track'
  ],
  data () {
    return {
      commentMessage: ''
    }
  },
  methods: {
    isLiked (postLike) {
      this.campaign.is_liked = postLike

      if (postLike) {
        this.campaign.likes += 1
      } else {
        this.campaign.likes -= 1
      }
    },
    isFollowed (follow) {
      this.campaign.is_follow = follow
    },
    isLikedComment (index, like) {
      this.campaign.comments[index].is_commentLike = like
    },
    saveComment (postComment) {
      this.campaign.comments.push({
        image: require('../../../../assets/images/user/user-04.jpg'),
        user: { name: 'Sandy S', msg: postComment, time: new Date() },
        is_commentLike: false
      })

      this.commentMessage = ''
    }
  }
}
</script>

<style>
  .dropdown-item{
    color: #212529 !important;
  }
  .dropdown-menu .dropdown-item:focus, .dropdown-menu .dropdown-item:hover{
    background: transparent;
    color: var(--iq-primary) !important;
  }
</style>
