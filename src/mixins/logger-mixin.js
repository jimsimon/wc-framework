import shortid from 'shortid'

export default (superclass) => {

  class LoggerMixin extends superclass {
    constructor(name, uid = shortid.generate(), format = '[%s](%s-%s): ') {
      super()
      this.name = name || this.tagName.toLowerCase()
      this.uid = uid
      this.format = format
    }

    log(...params) {
      this._passToConsole('log', ...params)
    }

    info(...params) {
      this._passToConsole('info', ...params)
    }

    warn(...params) {
      this._passToConsole('warn', ...params)
    }

    error(...params) {
      this._passToConsole('error', ...params)
    }

    _passToConsole(level, ...params) {
      console[level](this.format, new Date().toISOString(), this.name, this.uid, ...params)
    }
  }

  // Don't wrap a second time if something else already added this mixin
  if (superclass instanceof LoggerMixin) {
    return superclass
  }
  return LoggerMixin
}
