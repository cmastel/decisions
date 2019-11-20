const switchStatement = item => {
  let number = 0;
  switch (item) {
  case '1':
    number = 4;
    break;
  case '2':
    number = 3;
    break;
  case '3':
    number = 2;
    break;
  case '4':
    number = 1;
  break;
  default:
    null;
  }
  return number;
}

module.exports = {
  switchStatement
}
