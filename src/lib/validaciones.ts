export function esTelefonoValido(tel: string): boolean {
  const limpio = tel.replace(/[\s\-]/g, "")
  return /^(\+34)?[6789]\d{8}$/.test(limpio)
}
