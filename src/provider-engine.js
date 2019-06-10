'use strict'

const inherits = require('util').inherits
const HookedWalletPuffsTxSubprovider = require('web3-provider-engine/subproviders/hooked-wallet-puffstx')

module.exports = WalletSubprovider

inherits(WalletSubprovider, HookedWalletPuffsTxSubprovider)

function WalletSubprovider (wallet, opts) {
  opts = opts || {}

  opts.getAccounts = function (cb) {
    cb(null, [ wallet.getAddressString() ])
  }

  opts.getPrivateKey = function (address, cb) {
    if (address !== wallet.getAddressString()) {
      cb(new Error('Account not found'))
    } else {
      cb(null, wallet.getPrivateKey())
    }
  }

  WalletSubprovider.super_.call(this, opts)
}
