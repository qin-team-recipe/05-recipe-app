/** @package */
export const removeLastEqualSign = (str: string) => {
  const pos = str.lastIndexOf("=")
  if (pos === -1) return str
  return str.substring(0, pos) + str.substring(pos + 1)
}
