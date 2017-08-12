export default (superclass) => class ShallowPropertyComparatorMixin extends superclass {
  shouldComponentRender (oldProps, newProps, slotchangeEvent) {
    if (slotchangeEvent) {
      this.log('shouldComponentRender: true')
      return true
    }

    for (const [name, newValue] of Object.entries(newProps)) {
      const oldValue = oldProps[name]
      if (newValue !== oldValue) {
        this.log('shouldComponentRender: true')
        return true
      }
    }
    this.log('shouldComponentRender: false')
    return false
  }
}
