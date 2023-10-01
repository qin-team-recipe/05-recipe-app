/** @package */
export const removeLastEqualSign = (str: string) => {
  const index = str.indexOf("=")

  if (index === -1) {
    return ""
  }

  return str.slice(index + "=".length)
}
