const SerialPort = require('serialport')
require('events').EventEmitter.defaultMaxListeners = 0;

function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

exports.getComList = () => {
  return new Promise((resolve, reject) => {
    SerialPort.list().then(comList => {
      resolve(comList)
    }).catch(err => {
      reject(err)
    })
  })
}

exports.openCom = (comName, openOptions) => {
  const port = new SerialPort(comName, openOptions)
  closePort(port)
  port.open();
  return port;
}

function closePort(port) {
  if (port.isOpen) port.close();
}

exports.closeCom = closePort;

exports.sendFrame = (port, sendFrame) => {
  return port.write(sendFrame, 'hex', (err) => {
    console.log(err);
  })
}

exports.receiveFrame = (port) => {
  return new Promise((resolve, reject) => {
    port.on('data', (data) => {
      resolve(buf2hex(data).toUpperCase())
    })
  })
}

exports.sendAndReceive = (port, sendFrame) => {
  let sendFlag = port.write(sendFrame, 'hex', (err) => {
    return err
  })
  if (sendFlag) return new Promise((resolve, reject) => {
    port.on('data', (data) => {
      resolve(buf2hex(data).toUpperCase())
    })
  })
  else return 'error'
}