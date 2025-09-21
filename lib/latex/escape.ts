export const escapeLatex = (s: string): string => {
  if (!s) return ""
  return s.replace(/([#$%&~_^\\{}])/g, "\\$1")
}

export const escapeLatexBraces = (s: string): string => {
  if (!s) return ""
  return s.replace(/([{}])/g, "\\$1")
}
