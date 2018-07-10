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

import { observable, computed } from 'mobx';
import stores from '@parity/mobx';

export const STATUS_BAD = 'bad';
export const STATUS_WARN = 'needsAttention';
export const STATUS_OK = 'ok';

export default class Store {
  @observable netPeers = {};

  constructor (api) {
    this._api = api;

    this.ethSyncingStore = stores.eth.syncing().get(api);
    this.parityNetPeersStore = stores.parity.netPeers().get(api);
  }

  // TODO Add Clock is sync
  @computed
  get overall () {
    if (this.ethSyncingStore.syncing === undefined || this.parityNetPeersStore.netPeers === undefined) {
      return {
        status: STATUS_BAD,
        message: ['Unable to fetch node health.']
      };
    }

    if (this.parityNetPeersStore.netPeers.connected && this.parityNetPeersStore.netPeers.connected.eq(0)) {
      return {
        status: STATUS_BAD,
        message: ['You are not connected to any peers. There is most likely some network issue. Fix connectivity.']
      };
    }

    if (this.parityNetPeersStore.netPeers.connected && this.parityNetPeersStore.netPeers.connected.eq(1)) {
      return {
        status: STATUS_WARN,
        message: ['You are connected to only one peer. Your node might not be reliable. Check your network connection.']
      };
    }

    if (this.ethSyncingStore.syncing) {
      return {
        status: STATUS_WARN,
        message: ["Your node is still syncing, the values you see might be outdated. Wait until it's fully synced."]
      };
    }

    return {
      status: STATUS_OK,
      message: []
    };
  }

  static instance = null;

  static get (api) {
    if (!Store.instance) {
      Store.instance = new Store(api);
    }

    return Store.instance;
  }
}
