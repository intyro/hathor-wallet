/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { t } from 'ttag';
import hathorLib from '@hathor/wallet-lib';
import { CONFIRM_RESET_MESSAGE } from '../constants';
import SpanFmt from './SpanFmt';


/**
 * Component that shows a modal to ask form confirmation data to reset the wallet  
 * Asks for the password and for the user to write a sentence saying that really wants to reset
 *
 * @memberof Components
 */
class ModalResetAllData extends React.Component {
  /**
   * errorMessage {string} Message to be shown to the user in case of error in the form
   */
  state = { errorMessage: '' };

  /**
   * Method to be called when user clicks the button to confirm  
   * Validates the form and then calls a method from props to indicate success
   *
   * @param {Object} e Event emitted when button is clicked
   */
  handleConfirm = (e) => {
    e.preventDefault();
    if (this.refs.formConfirm.checkValidity() === false) {
      this.refs.formConfirm.classList.add('was-validated');
    } else {
      this.refs.formConfirm.classList.remove('was-validated');
      const password = this.refs.password.value;
      const forgotPassword = this.refs.forgotPassword.checked;
      if (password && !hathorLib.wallet.isPasswordCorrect(password)) {
        this.setState({errorMessage: t`Invalid password`})
      } else if (!password && !forgotPassword) {
        this.setState({errorMessage: t`You must write your password or check that you have forgotten it`});
      } else {
        if (this.refs.confirmMessage.value.toLowerCase() === CONFIRM_RESET_MESSAGE.toLowerCase()) {
          this.props.success();
        } else {
          this.setState({errorMessage: t`Confirm message does not match`})
        }
      }
    }
  }

  render() {
    const getFirstMessage = () => {
      let firstMessage = t`If you reset your wallet, all data will be deleted, and you will lose access to your tokens. To recover access to your tokens, you will need to import your words again.`;
      if (!hathorLib.wallet.isBackupDone()) {
        firstMessage = t`${firstMessage} You still haven't done the backup of your words.`;
      }
      return firstMessage;
    }
    return (
      <div className="modal fade" id="confirmResetModal" tabIndex="-1" role="dialog" aria-labelledby="confirmResetModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{t`Reset all data`}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{getFirstMessage()}</p>
              <p><SpanFmt>{t`If you still wanna do it, we need your password and for you to write down **'${CONFIRM_RESET_MESSAGE}'** to confirm the operation.`}</SpanFmt></p>
              <form ref="formConfirm">
                <div className="form-group">
                  <label htmlFor="password">{t`Password*`}</label>
                  <input type="password" ref="password" autoComplete="off" className="pin-input form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmMessage">{t`Confirm message*`}</label>
                  <input type="text" ref="confirmMessage" placeholder={t`Write '${CONFIRM_RESET_MESSAGE}'`} className="form-control" required />
                </div>
                <div className="form-check">
                  <input ref="forgotPassword" type="checkbox" className="form-check-input" id="forgotPassword" />
                  <label className="form-check-label" htmlFor="forgotPassword">{t`I forgot my password`}</label>
                </div>
              </form>
              <div className="row mt-3">
                <div className="col-12 col-sm-10">
                    <p className="error-message text-danger">
                      {this.state.errorMessage}
                    </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">{t`No`}</button>
              <button onClick={this.handleConfirm} type="button" className="btn btn-hathor">{t`Yes`}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalResetAllData;
