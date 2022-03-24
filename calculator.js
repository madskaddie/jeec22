
function Calculator(onStateChange) {
  this.onStateChange = onStateChange
  this.state = { displayText: '0', arg0: undefined, fn: undefined };
  this.onStateChange(this.state);
  return;
}

Calculator.prototype.setState = function(value) {
  Object.assign(this.state, value);
  this.onStateChange(this.state);
}

Calculator.prototype.appendDigit = function(digit) {
  this.setState({displayText: this.state.displayText + digit});

}
Calculator.prototype.setOperation = function(fn) {
  let arg0 = Number.parseFloat(this.state.displayText);
  this.setState({displayText: '0', arg0: arg0, fn: fn});
  return;
}
Calculator.prototype.execute = function() {
  if ( typeof(this.state.fn) === 'undefined') {
    this.setErr();
    return;
  }
  let arg1 = Number.parseFloat(this.state.displayText);
  let result;
  switch ( this.state.fn ) {
    case '+':
      result = this.state.arg0 + arg1;
      break;
    case '-':
      result = this.state.arg0 - arg1;
      break;
    case '*':
      result = this.state.arg0 * arg1;
      break;
    case '/':
      result = this.state.arg0 / arg1;
      break;
    default:
      this.setErr();
      return
  }
  this.setState({displayText:''+result, arg0: arg1, fn: undefined});
};

Calculator.prototype.setErr = function(displayText='err') {
  this.setState({displayText:displayText, arg0: undefined, fn: undefined});
}

Calculator.prototype.clear = function() {
  this.setState({displayText:'', arg0: undefined, fn: undefined});
};

function notImplemented() {
  window.alert(`not implemented: ${this.text}`);
};
