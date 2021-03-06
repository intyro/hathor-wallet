/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from "react-redux";
import { t } from 'ttag';


const mapStateToProps = (state) => {
  return {
    isOnline: state.isOnline,
    network: state.network
  };
};


/**
 * Component that shows the status of the server from the websocket connection
 *
 * @memberof Components
 */
const ServerStatus = (props) => {
  if (props.isOnline === undefined || !props.network) {
    return null;
  }

  return (
    <div className="d-flex flex-column version-wrapper align-items-center">
      <span className={props.network.startsWith("testnet") ? "text-testnet" : ""}>{props.network}</span>
      <span className={props.isOnline ? "" : "text-danger"}>{props.isOnline ? t`Online` : t`Offline`}</span>
    </div>
  );
};

export default connect(mapStateToProps)(ServerStatus);
