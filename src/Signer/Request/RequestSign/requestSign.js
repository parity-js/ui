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

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactMarkdown from 'react-markdown';

import { hexToAscii } from '@parity/api/lib/util/format';

import styles from './requestSign.css';

function isAscii (data) {
  for (let i = 2; i < data.length; i += 2) {
    let n = parseInt(data.substr(i, 2), 16);

    if (n < 32 || n >= 128) {
      return false;
    }
  }

  return true;
}

function decodeMarkdown (data) {
  return decodeURIComponent(escape(hexToAscii(data)));
}

export function isMarkdown (data) {
  try {
    const decoded = decodeMarkdown(data);

    for (let i = 0; i < decoded.length; i++) {
      const code = decoded.charCodeAt(i);

      if (code < 32 && code !== 10) {
        return false;
      }
    }

    return decoded.indexOf('#') !== -1 || decoded.indexOf('*') !== -1;
  } catch (error) {
    return false;
  }
}

@observer
export default class RequestSign extends Component {
  static propTypes = {
    dataToSign: PropTypes.string.isRequired
  };

  renderData (dataToSign) {
    if (isMarkdown(dataToSign)) {
      return <ReactMarkdown source={decodeMarkdown(dataToSign)} />;
    }

    if (isAscii(dataToSign)) {
      return hexToAscii(dataToSign);
    }

    return <FormattedMessage id='signer.signRequest.unknownBinary' defaultMessage='(Unknown binary data)' />;
  }

  render () {
    const { dataToSign } = this.props;

    return (
      <div className={styles.info}>
        <p>
          <FormattedMessage
            id='signer.signRequest.request'
            defaultMessage='A request to sign data using your account:'
          />
        </p>
        <div className={styles.signData}>
          <p>{this.renderData(dataToSign)}</p>
        </div>
        <p>
          <strong>
            <FormattedMessage
              id='signer.signRequest.warning'
              defaultMessage='WARNING: The consequences of doing this may be grave. Confirm the request only if you are sure.'
            />
          </strong>
        </p>
      </div>
    );
  }
}
