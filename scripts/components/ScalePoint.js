/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React, { PropTypes } from 'react'
function ScalePoint({ description, name, points }) {
  return (
    <li className="profile-items__list-item">
      <div className="scalepoint-number">{points}</div>
      <div className="item-name">{name}</div>
      <div className="item-description">{description}</div>
    </li>
  )
}

ScalePoint.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
}

ScalePoint.defaultProps = {
  description: 'Your points in this category'
}

export default ScalePoint