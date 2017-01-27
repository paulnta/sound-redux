/**
 * react-webnerplan (https://enerplan.ch)
 *
 * Copyright © 2016-2017 Enerplan SA. All rights reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Paul Nta <paul.nta@enerplan.ch>, $(date) $(user)
 */
import React, { PropTypes } from 'react'
const iconCount = 8
function Badge({ name, description, image, index }) {
  const defaultImg = `/images/badge${index%iconCount}.jpg`
  const styles = {
    backgroundImage: `url('${image || defaultImg }')`
  }
  return (
    <li className="profile-items__list-item">
      <div className="item-image" style={styles}></div>
      <div className="item-name">{name.toUpperCase()}</div>
    </li>
  )
}

Badge.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}

export default Badge