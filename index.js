class Declare {

  constructor(executor = () => { }) {
    this.state = 'pending'
    this.value
    this.resolveHandler = () => { }
    executor(this.resolve.bind(this))
  }

  resolve(value) {
    if (this.state === 'pending') {
      this.state = 'resolved';
      this.value = value
      this.resolveHandler(value)
    }
  }

  then(resolveFunction = () => { }) {
    this.resolveHandler = resolveFunction
    if (this.state === 'resolved') {
      const thenValue = resolveFunction(this.value)
      const newDeclare = new Declare((newResolve) => {
        newResolve(thenValue)
      })
      return newDeclare
    } else {
      return this
    }
  }
}
module.exports = Declare