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
import { observer } from 'mobx-react';

import Account from '../Account';
import ConfirmForm from '../ConfirmForm';
import GasPriceStore from '../../GasPriceEditor/store';
import Layout from '../Layout';
import Origin from '../Origin';
import RequestDecrypt from './RequestDecrypt';
import RequestSend from './RequestSend';
import RequestSign from './RequestSign';
import { requestShape } from '../util/react';

import styles from './request.css';

@observer
class Request extends Component {
  static contextTypes = {
    api: PropTypes.object.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    confirmElement: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    isFocused: PropTypes.bool,
    request: requestShape.isRequired
  };

  componentWillMount () {
    const { payload } = this.props.request;
    const transaction = payload.sendTransaction || payload.signTransaction;
    if (transaction) {
      this.gasPriceStore = GasPriceStore.get(this.context.api, transaction);
    }
  }

  /**
   * Get the author of a request
   */
  getRequestAuthor = () => {
    const { payload } = this.props.request;
    if (payload.sign) {
      return payload.sign.address;
    }
    if (payload.decrypt) {
      return payload.decrypt.address;
    }
    const transaction = payload.sendTransaction || payload.signTransaction;
    if (transaction) {
      return transaction.from;
    }
  };

  /**
   * Get the request data to sign
   * Return an object { dataToSign, transaction } where only one of the 2 field
   * `dataToSign` or `transaction` is not empty
   */
  getRequestData = () => {
    const { payload } = this.props.request;
    if (payload.sign) {
      return { dataToSign: payload.sign.data };
    }
    if (payload.decrypt) {
      return { dataToSign: payload.decrypt.msg };
    }
    const transaction = payload.sendTransaction || payload.signTransaction;
    if (transaction) {
      return {
        transaction: this.gasPriceStore.overrideTransaction(transaction)
      };
    }
  };

  /**
   * Get the Component that describes the request:
   * - RequestSend: transaction details for transactions
   * - RequestDecrypt: decrypt message for decrypt
   * - RequestSign: signed message for sign
   */
  getRequestDescription = () => {
    const { payload } = this.props.request;
    if (payload.sign) {
      return RequestSign;
    }
    if (payload.decrypt) {
      return RequestDecrypt;
    }
    const transaction = payload.sendTransaction || payload.signTransaction;
    if (transaction) {
      return RequestSend;
    }
    return null;
  };

  render () {
    const { className, confirmElement, request, ...rest } = this.props;
    const { origin } = request;
    const address = this.getRequestAuthor();
    const requestData = this.getRequestData();
    const RequestDescription = this.getRequestDescription();
    const ConfirmVia = confirmElement;

    return (
      <Layout className={className}>
        <Layout.Main className={styles.signDetails}>
          <div className={styles.address}>
            <Account address={address} />
            <Origin origin={origin} />
          </div>
          <div className={styles.details}>
            <RequestDescription address={address} {...requestData} />
          </div>
        </Layout.Main>
        <Layout.Side>
          <ConfirmForm request={request}>
            <ConfirmVia address={address} request={request} {...requestData} {...rest} />
          </ConfirmForm>
        </Layout.Side>
      </Layout>
    );
  }
}

export default Request;
