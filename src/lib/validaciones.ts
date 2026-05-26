export function esTelefonoValido(tel: string): boolean {
  const limpio = tel.replace(/[\s\-]/g, "")
  return /^(\+34)?[6789]\d{8}$/.test(limpio)
}

export function esEmailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function esCifValido(cif: string): boolean {
  return /^[A-Z]\d{7}[A-Z0-9]$/.test(cif.trim().toUpperCase())
}
