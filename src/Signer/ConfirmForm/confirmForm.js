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
import PropTypes from 'prop-types';

import ConfirmReject from './ConfirmReject';
import ConfirmRejectToggle from './ConfirmRejectToggle';
import { requestShape } from '../util/react';

export default class ConfirmForm extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    request: requestShape.isRequired
  };

  state = {
    isRejectOpen: false
  };

  handleToggle = () =>
    this.setState({
      isRejectOpen: !this.state.isRejectOpen
    });

  render () {
    const { children, className, request } = this.props;
    const { isRejectOpen } = this.state;

    return (
      <div className={className}>
        {isRejectOpen ? <ConfirmReject request={request} /> : children}
        <ConfirmRejectToggle isRejectOpen={isRejectOpen} onToggle={this.handleToggle} />
      </div>
    );
  }
}
