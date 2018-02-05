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

import { isValidElement } from 'react';
import PropTypes from 'prop-types';

export function isReactComponent (componentOrElem) {
  return isValidElement(componentOrElem) && typeof componentOrElem.type === 'function';
}

export const transactionShape = PropTypes.shape({
  condition: PropTypes.object,
  data: PropTypes.string,
  from: PropTypes.string.isRequired,
  gas: PropTypes.object.isRequired,
  gasPrice: PropTypes.object.isRequired,
  to: PropTypes.string,
  value: PropTypes.object.isRequired
});

export const requestShape = PropTypes.shape({
  date: PropTypes.instanceOf(Date),
  id: PropTypes.object.isRequired,
  isSending: PropTypes.bool,
  origin: PropTypes.object.isRequired,
  payload: PropTypes.oneOfType([
    PropTypes.shape({ decrypt: PropTypes.object.isRequired }),
    PropTypes.shape({ sendTransaction: transactionShape.isRequired }),
    PropTypes.shape({ sign: PropTypes.object.isRequired }),
    PropTypes.shape({ signTransaction: transactionShape.isRequired })
  ]).isRequired
});
