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

import React from 'react';
import PropTypes from 'prop-types';

import IdentityIcon from '../../IdentityIcon';

import AccountLink from './AccountLink';
import Balance from './Balance';
import Name from './Name';

import styles from './account.css';

export default function Account ({ address, className, isDisabled }) {
  return (
    <div className={`${styles.account} ${className}`}>
      <AccountLink address={address}>
        <IdentityIcon center disabled={isDisabled} address={address} />
      </AccountLink>
      <Name address={address} />
      <Balance address={address} />
    </div>
  );
}

Account.propTypes = {
  address: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool
};
