
const WebSocket = global.WebSocket || global.MozWebSocket
import { compose, concat } from 'ramda'

function WS (uri, protocols, opts) {
  return protocols ? new WebSocket(uri, protocols) : new WebSocket(uri)
}

if (WebSocket) {
  WS.prototype = WebSocket.prototype

  WS.prototype.on = function (event, callback) {
    this['on' + event] = callback
  }

  WS.prototype.once = function (event, callback) {
    this['on' + event] = function () {
      callback.apply(callback, arguments)
      this['on' + event] = null
    }.bind(this)
  }

  WS.prototype.off = function (event) {
    this['on' + event] = null
  }
}

let toArrayFormat = (a) => Array.isArray(a) ? a : [a]

class Socket {
  constructor (options = {}) {
    let {
      wsUrl = 'wss://ws.blockchain.info/inv'
    } = options
    this.wsUrl = wsUrl
    this.headers = { 'Origin': 'https://blockchain.info' }
    this.socket
    this.reconnect = null
    this.pingInterval = 15000
    this.pingIntervalPID = null
    this.pingTimeout = 5000
    this.pingTimeoutPID = null
  }

  connect (onOpen, onMessage, onClose) {
    this.reconnect = function () {
      let connect = this._initialize.bind(this, onOpen, onMessage, onClose)
      connect()
    }.bind(this)
    this.reconnect()
  }

  _initialize (onOpen, onMessage, onClose) {
    if (!this.socket || this.socket.readyState === 3) {
      try {
        this.pingIntervalPID = setInterval(this.ping.bind(this), this.pingInterval)
        this.socket = new WS(this.wsUrl, [], { headers: this.headers })
        this.socket.on('open', onOpen)
        this.socket.on('message', onMessage)
        this.socket.on('close', onClose)
      } catch (e) {
        console.error('Failed to connect to websocket', e)
      }
    }
  }

  ping () {
    this.send(Socket.pingMessage())
    let connect = this.reconnect.bind(this)
    let close = this.close.bind(this)
    this.pingTimeoutPID = setTimeout(compose(connect, close), this.pingTimeout)
  }

  close () {
    if (this.socket) this.socket.close()
    this.socket = null
    clearInterval(this.pingIntervalPID)
    clearTimeout(this.pingTimeoutPID)
  }

  send (message) {
    if (this.socket && this.socket.readyState === 1) {
      this.socket.send(message)
    }
  }

  static walletSubMessage (guid) {
    if (guid == null) return ''
    return JSON.stringify({ op: 'wallet_sub', guid })
  }

  static blockSubMessage () {
    return JSON.stringify({ op: 'blocks_sub' })
  }

  static addrSubMessage (addresses) {
    if (addresses == null) return ''
    let toMsg = (addr) => JSON.stringify({ op: 'addr_sub', addr })
    return toArrayFormat(addresses).map(toMsg).reduce(concat, '')
  }

  static xPubSubMessage (xpubs) {
    if (xpubs == null) return ''
    let toMsg = (xpub) => JSON.stringify({ op: 'xpub_sub', xpub })
    return toArrayFormat(xpubs).map(toMsg).reduce(concat, '')
  }

  static pingMessage () {
    return JSON.stringify({ op: 'ping' })
  }

  static onOpenMessage (guid, addresses, xpubs) {
    return (
      Socket.blockSubMessage() +
      Socket.walletSubMessage(guid) +
      Socket.addrSubMessage(addresses) +
      Socket.xPubSubMessage(xpubs)
    )
  }
}

export default Socket
