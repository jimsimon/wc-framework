export default (superclass) => class HostAttributesMixin extends superclass {

  static get hostAttributes() {
    return {}
  }

  constructor() {
    super()

    const {constructor: Type} = this
    for (const [name, value] of Object.entries(Type.hostAttributes)) {
      this.setAttribute(name, value)
    }
  }

}
