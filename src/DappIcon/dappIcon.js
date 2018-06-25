// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import styles from './dappIcon.css';

@observer
class DappIcon extends Component {
  static contextTypes = {
    api: PropTypes.object.isRequired
  };

  static propTypes = {
    app: PropTypes.object.isRequired,
    className: PropTypes.string,
    raised: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'normal'])
  };

  static defaultProps = {
    raised: true,
    size: 'normal'
  };

  state = {
    hasError: false // Do not show broken image when fetching image gives error
  };

  handleError = () => {
    this.setState({ hasError: true });
  };

  render () {
    const { app, className, raised, size } = this.props;
    const classes = [styles.icon, raised && styles.raised, styles[size], className].join(' ');

    return (
      <div className={classes}>
        <img
          className={[styles.image, this.state.hasError && styles.hidden].join(' ')}
          onError={this.handleError}
          src={app.image}
          alt=''
        />
      </div>
    );
  }
}

export default DappIcon;
