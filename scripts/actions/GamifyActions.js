/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */

export const EventTypes = {
  /**
   * When the user clicks on Play button
   * The event must provide a payload with fields:
   *  - artist
   *  - playlist
   *  - genre
   */
  START_LISTEN_SONG: 'START_LISTEN_SONG',

  /**
   * When the user clicks on the Follow button.
   * The event must provide a payload with fields:
   *  - artist
   */
  START_FOLLOW_USER: 'START_FOLLOW_USER',

  /**
   * When the user clicks on a song's Like button
   * The event must provide a payload with fields:
   *  - artist
   *  - genre
   */
  LIKE_SONG: 'LIKE_SONG',

  /**
   * When the user toggles a songs Like button (false)
   * The event must provide a payload with fields:
   *  - artist
   *  - genre
   */
  UNLIKE_SONG: 'UNLIKE_SONG'
}


/**
 * Post an event to Gamify
 * @param type
 * @param payload
 * @return {function(*, *)}
 */
export function postEvent(type, payload) {
  return (_, getState) => {
    const { authed } = getState()
    const user = authed.user.id
    const createDate = new Date().toISOString()
    const body = { user, type, payload, createDate }
    console.log(type, body)
    fetch('/api/events', {
      method: 'post',
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) { console.log('event posted') }
        else {
          console.log('couldn\'t post event')
        }
      })
  }
}