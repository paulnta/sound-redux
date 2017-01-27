/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ScalePoint from '../components/ScalePoint'
import Badge from '../components/Badge'

class Profile extends React.Component {
  static propTypes = {
    authed: PropTypes.object,
    badges: PropTypes.array,
    scalepoints: PropTypes.array,
  }

  renderScalePoints() {
    const { scalepoints } = this.props
    return scalepoints.map((scalePoint, index) => {
      return <ScalePoint key={index} {...scalePoint} />
    })
  }

  renderBadgeList() {
    const { badges } = this.props
    console.log(badges)
    return badges.map((badge, index) => {
      return <Badge key={index} index={index} {...badge} />
    })
  }

  render() {
    const { scalepoints, badges } = this.props
    return (
      <div className="profile">
        <h2 className="section-title">ScalePoints ({scalepoints.length})</h2>
        <section className="profile-scalepoints">
          <ul className="profile-items__list">
            { this.renderScalePoints() }
          </ul>
        </section>
        <h2 className="section-title">Badges ({badges.length})</h2>
        <section className="profile-badges">
          <ul className="profile-badge-list">
            { this.renderBadgeList() }
          </ul>
        </section>
      </div>
    )
  }
}


const mapState = state => ({
  authed: state.authed,
  badges: state.profile.badges,
  scalepoints: state.profile.scalepoints,
})

const mapDispatch = null

export default connect(
  mapState,
  mapDispatch,
)(Profile)
