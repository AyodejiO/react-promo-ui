import { is } from 'ramda'

export default class Campaign {
  constructor (campaign = {}) {
    this.id = is(String, campaign.id) ? campaign.id : ''
    this.tags = is(Array, campaign.tags) ? campaign.tags : []
    this.artwork = is(String, campaign.artwork) ? campaign.artwork : ''
    this.title = is(String, campaign.title) ? campaign.title : ''
    this.content = is(String, campaign.content) ? campaign.content : ''
    this.status = is(String, campaign.status) ? campaign.status : 'draft'
    this.visibility = is(String, campaign.visibility) ? campaign.visibility : 'public'
    // this.likes = is(Number, campaign.likes) ? campaign.likes : 0
    this.created_at = is(Date, campaign.created_at) ? campaign.created_at : null
    this.updated_at = is(Date, campaign.update_at) ? campaign.update_at : null
    // this.is_follow = is(Boolean, campaign.is_follow) ? campaign.is_follow : false
    // this.is_liked = is(Boolean, campaign.is_liked) ? campaign.is_liked : false
    this.user = is(Object, campaign.user) ? campaign.user : {}
    this.tracks = is(Array, campaign.tracks) ? campaign.tracks : []
    this.feedbacks = is(Array, campaign.feedbacks) ? campaign.feedbacks : []
  }
}
