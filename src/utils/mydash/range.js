const baseRange = (start, end, step) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[++index] = start;
    start += step;
  }

  return result;
}

function range(start = 0, end, step) {
		if (end === undefined) {
      end = start;
			start = 0;
    }

    step = step === undefined ? (start < end ? 1 : -1) : step;
    return baseRange(start, end, step);
}

// Alternative
/* function range(start = 0, end, step = 1, isRight = false) {
  const array = [];
    // 0 arguments
  if (end === undefined && step === 1 && start === 0) {
    return []
  } 
  // 1 argument
  else if (end === undefined && step === 1 && start > 0) {
    let tempEnd = start;
    for (let i = 0; i < tempEnd; i++) {
      array.push(i)
    }
  } 
  else if (end === undefined && step === 1 && start < 0) {
    let tempEnd = start;
    for (let i = 0; i > tempEnd; i--) {
      array.push(i)
    }
  } 
  // 2 arguments
  else if (step === 1 && start < end) {
    for (let i = start; i < end; i++) {
      array.push(i)
    }
  } 
  else if (step === 1 && start > end) {
    for (let i = start; i > end; i--) {
      array.push(i)
    }
  } 
  else if (step === 0) {
    let item = start;
    for (let i = start; i < end; i++) {
      array.push(item)
    }
  } 
  // 3 arguments
  else if (start < end) {
    for (let i = start; i < end; i+= step) {
      array.push(i)
    }
  }
  else if (start > end) {
    for (let i = start; i > end; i+= step) {
      array.push(i)
    }
  }
  return isRight ? array.reverse() : array
} */

export { range }



