let counter = 0;

module.exports = {
  incrementCounter() {
    counter++;
  },
  getCounter() {
    return counter;
  }
}