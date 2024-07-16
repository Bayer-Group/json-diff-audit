const debugPrinter = (message) => {
  const auditDebug = process.env.audit__debug
  if (auditDebug === "true") {
    console.info(message)
  }
}

module.exports = {
  debugPrinter,
}
