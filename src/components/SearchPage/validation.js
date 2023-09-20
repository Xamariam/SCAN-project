function validateInn(inn, error) {
  let result = false
  if (typeof inn === 'number') {
    inn = inn.toString()
  } else if (typeof inn !== 'string') {
    inn = ''
  }
  if (!inn.length) {
    error.code = 1
    error.message = 'ИНН пуст'
  } else if (/[^0-9]/.test(inn)) {
    error.code = 2
    error.message = 'ИНН должен состоять из цифр'
  } else if ([10].indexOf(inn.length) === -1) {
    error.code = 3
    error.message = 'ИНН состоит из 10 цифр'
  } else {
    let checkDigit = function (inn, coefficients) {
      let n = 0
      for (var i in coefficients) {
        n += coefficients[i] * inn[i]
      }
      return parseInt((n % 11) % 10)
    }
    switch (inn.length) {
      case 10:
        let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8])
        if (n10 === parseInt(inn[9])) {
          result = true
        }
        break
    }
    if (!result) {
      error.code = 4
      error.message = 'Недействительный ИНН'
    }
  }

  return { result, message: error.message }
}

export default validateInn
