import {
  DefaultBodyType,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
} from "msw"

/** @package */
export const get = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  return res(
    ctx.status(200),
    ctx.json({
      favoriteCount: 222,
      img: "/pizza.jpg",
      introduction:
        "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
      name: "山田の特製マルゲリータ",
      user: "山田シェフ",
      userImg: "/chef.jpg",
    }),
  )
}
