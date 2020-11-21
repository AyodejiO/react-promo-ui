import { is } from 'ramda'

export default class Track {
  constructor (track = {}) {
    this.id = is(String, track.id) ? track.id : ''
    this.title = is(String, track.title) ? track.title : null
    this.mp3 = is(String, track.mp3) ? track.mp3 : null
    this.wav = is(String, track.wav) ? track.wav : null
    this.created_at = is(Date, track.created_at) ? track.created_at : null
    this.updated_at = is(Date, track.update_at) ? track.update_at : null
  }
}
