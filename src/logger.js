import shortid from 'shortid'

export default class Logger {
  constructor(name, uid = shortid.generate(), format = '[%s](%s-%s): ') {
    this.name = name
    this.uid = uid
    this.format = format
  }

  log (...params) {
    this._passToConsole('log', ...params)
  }

  info (...params) {
    this._passToConsole('info', ...params)
  }

  warn (...params) {
    this._passToConsole('warn', ...params)
  }

  error (...params) {
    this._passToConsole('error', ...params)
  }

  _passToConsole (level, ...params) {
    console[level](this.format, new Date().toISOString(), this.name, this.uid, ...params)
  }
}
