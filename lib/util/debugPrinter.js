const debugPrinter = (message) => {
  const auditDebug = process.env.json_diff_audit__debug
  if (auditDebug === "true") {
    console.info(message)
  }
}

module.exports = {
  debugPrinter,
}
