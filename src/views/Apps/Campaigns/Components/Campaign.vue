<template>
  <iq-card body-class="p-0">
    <template v-slot:body>
        <div class="user-post-data p-3">
          <div class="d-flex flex-wrap">
            <div class="media-support-user-img mr-3">
              <!-- <b-img rounded="circle" fluid :src="campaign.user.profile" alt=""/> -->
            </div>
            <div class="media-support-info mt-2">
              <h5 class="mb-0"><b-link href="javascript:void(0)" class="">{{campaign.user.name}}</b-link></h5>
              <p class="mb-0 text-secondary">Created {{campaign.created_at | formatDate }}</p>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <b-badge v-if="campaign.status == 'draft' || campaign.status == 'active'" variant="info">{{campaign.status}}</b-badge>
              <b-badge v-if="campaign.status == 'completed'" variant="success">{{campaign.status}}</b-badge>
              <b-dropdown id="dropdownMenuButton40" right variant="none" menu-class="p-0">
                <template v-slot:button-content>
                  <b-link href="javascript:void(0)" class="text-secondary"><i class="ml-3 ri-more-2-line"></i></b-link>
                </template>
                <a class="dropdown-item p-3" href="javascript:void(0)" @click="isFollowed(!campaign.is_follow)">
                  <div class="d-flex align-items-top">
                    <div class="icon font-size-20"><i class="ri-user-unfollow-line"></i></div>
                    <div class="data ml-2">
                      <span v-if="campaign.is_follow">
                        <h6>  Unfollow User</h6>
                      </span>
                      <span v-else>
                        <h6>  Follow User</h6>
                      </span>
                      <p class="mb-0">Stop seeing posts but stay friends.</p>
                    </div>
                  </div>
                </a>
                <a href="javascript:void(0)" class="dropdown-item p-3">
                  <div class="d-flex align-items-top">
                    <div class="icon font-size-20"><i class="ri-save-line"></i></div>
                    <div class="data ml-2">
                      <h6>Save Post</h6>
                      <p class="mb-0">Add this to your saved items</p>
                    </div>
                  </div>
                </a>
                <a href="javascript:void(0)" class="dropdown-item p-3">
                  <div class="d-flex align-items-top">
                    <div class="icon font-size-20"><i class="ri-close-circle-line"></i></div>
                    <div class="data ml-2">
                      <h6>Hide Post</h6>
                      <p class="mb-0">See fewer posts like this.</p>
                    </div>
                  </div>
                </a>
                <a class="dropdown-item p-3" href="javascript:void(0)">
                  <div class="d-flex align-items-top">
                    <div class="icon font-size-20"><i class="ri-notification-line"></i></div>
                    <div class="data ml-2">
                      <h6>Notifications</h6>
                      <p class="mb-0">Turn on notifications for this post</p>
                    </div>
                  </div>
                </a>
              </b-dropdown>
            </div>
          </div>
        </div>
      </template>
      <hr class="m-0" />
    <b-row class="p-4">
      <b-col md="3" class="text-center">
        <b-img thumbnail class="w-75 mx-auto" :src="campaign.artwork || `/img/default/compact-disk.jpg`" fluid alt="Responsive image"> </b-img>
        <p class="my-2 my-md-3 w-75 mx-auto">
          <router-link :to="{ name: 'campaigns.single', params: { campaign: campaign.slug }}" class="btn btn-primary btn-lg btn-block" v-if="campaign.status != 'draft'">
            <i class="far fa-play-circle fa-lg"></i> <b>Listen</b>
          </router-link>
          <router-link :to="{ name: 'campaigns.edit', params: { campaign: campaign.slug }}" class="btn btn-secondary btn-lg btn-block" v-if="campaign.status == 'draft'">
            <i class="fas fa-pen-square fa-lg"></i> <b>Edit</b>
          </router-link>
        </p>
      </b-col>
      <b-col>
      <div class="user-post">
        <h4 class="p-2">{{campaign.title}}</h4>
        <p class="p-2">{{campaign.content}}</p>
      </div>
      <div class="tags-area">
        <b-badge class="py-2 px-3 mr-2" variant="primary" v-for="(tag, index) in campaign.tags" :key="index">{{tag}}</b-badge>
      </div>
      <div class="comment-area p-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center justify-content-between">
            <div class="like-block position-relative d-flex align-items-center">
              <div class="d-flex align-items-center">
                <div class="like-data">
                  <i class="las la-record-vinyl" style="font-size: 20px; line-height: 1.7"></i>
                </div>
                <div class="total-like-block ml-2 mr-3">
                  <span>
                  {{campaign.tracks_count}} Tracks
                  </span>
                </div>
              </div>
              <div class="like-data mr-2">
                  <i class="las la-comment" style="font-size: 20px; line-height: 1.7"></i>
                </div>
              <div class="total-comment-block">
                <span>
                {{campaign.feedbacks_count}} Feedback
                </span>
              </div>
            </div>
          </div>
          <div class="share-block d-flex align-items-center feather-icon mr-3">
            <a href="javascript:void(0)"><i class="ri-share-line" style="font-size: 20px; line-height: 1.7"></i>
              <span class="ml-1">99 Share</span></a>
          </div>
        </div>
        <!-- <hr> -->
        <!-- <ul class="post-comments p-0 m-0">
          <li class="mb-2" v-for="(postComment, postCommentIndex) in campaign.comments" :key="postComment.id">
            <div class="d-flex flex-wrap">
              <div class="user-img">
                <b-img :src="postComment.image" alt="userimg" class="avatar-35"  rounded="circle" fluid />
              </div>
              <div class="comment-data-block ml-3">
                <h6>{{postComment.user.name}}</h6>
                <p class="mb-0">{{postComment.user.msg}}</p>
                <div class="d-flex flex-wrap align-items-center comment-activity">
                  <b-link @click="isLikedComment(postCommentIndex, !postComment.is_commentLike)">
                    <span v-if="!postComment.is_commentLike" class="text-primary">like</span>
                    <span class="text-secondary" v-else>unlike</span>
                  </b-link>
                  <b-link href="javascript:void(0);">reply</b-link>
                  <span>{{postComment.user.time | formatDate}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul> -->
        <!-- <b-form class="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
          <b-form-input type="text" @keyup.enter="saveComment(commentMessage)" v-model="commentMessage" class="rounded" placeholder="Lovely!" />
          <div class="comment-attagement d-flex">
            <b-link href="javascript:void(0);"><i class="ri-send-plane-line mr-2" @click="saveComment(commentMessage)"></i></b-link>
          </div>
        </b-form> -->
      </div>
    </b-col>
    </b-row>
</iq-card>
</template>
<script>
export default {
  name: 'Campaign',
  props: [
    'campaign'
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
