/** @package */
export const getRandomInt = (max: number): number => {
  // 「0」〜「渡した引数の数字」までのランダムな「number」を生成してreturnする関数（少しリッチな見た目にするため）
  return Math.floor(Math.random() * max)
}
