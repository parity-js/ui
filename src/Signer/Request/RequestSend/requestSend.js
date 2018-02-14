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
import { Popup } from 'semantic-ui-react';

import Button from '../../../Button';
import { GasIcon } from '../../../Icons';
import GasPriceEditor from '../../../GasPriceEditor';
import MethodDecoding from '../../../MethodDecoding';
import Layout from '../../Layout';
import { transactionShape } from '../../util/react';
import styles from './requestSend.css';

@observer
export default class RequestSend extends Component {
  static contextTypes = {
    api: PropTypes.object.isRequired
  };

  static propTypes = {
    address: PropTypes.string.isRequired,
    className: PropTypes.string,
    transaction: transactionShape.isRequired
  };

  gasStore = GasPriceEditor.Store.get(this.context.api, this.props.transaction);

  render () {
    const { address, className } = this.props;
    return (
      <div className={[className, styles.method].join(' ')}>
        <MethodDecoding
          address={address}
          historic={false}
          transaction={this.gasStore.overrideTransaction(this.props.transaction)}
        />

        <div className={styles.editButtonRow}>
          <Popup
            className={styles.gasPriceEditor}
            content={this.renderTxEditor()}
            flowing
            on='click'
            trigger={
              <Button
                icon={<GasIcon />}
                label={
                  <FormattedMessage id='signer.mainDetails.editTx' defaultMessage='Edit conditions/gas/gasPrice' />
                }
              />
            }
          />
        </div>
      </div>
    );
  }

  renderTxEditor () {
    return (
      <Layout>
        <GasPriceEditor store={this.gasStore} />
      </Layout>
    );
  }
}
