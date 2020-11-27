import { is } from 'ramda'

export default class Feedback {
  constructor (feedback = {}) {
    this.id = is(String, feedback.id) ? feedback.id : ''
    this.user_id = is(String, feedback.user_id) ? feedback.user_id : null
    this.campaign_id = is(String, feedback.campaign_id) ? feedback.campaign_id : null
    this.track_id = is(String, feedback.track_id) ? feedback.track_id : null
    this.rating = is(String, feedback.rating) ? feedback.rating : null
    this.remark = is(String, feedback.remark) ? feedback.remark : null
    this.created_at = is(Date, feedback.created_at) ? feedback.created_at : null
    this.updated_at = is(Date, feedback.update_at) ? feedback.update_at : null
  }
}
