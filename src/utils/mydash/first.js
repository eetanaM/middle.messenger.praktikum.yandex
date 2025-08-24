function first(array) {
		if (!Array.isArray(array)) {
      return undefined
    }

    return array[0]
}

export { first }