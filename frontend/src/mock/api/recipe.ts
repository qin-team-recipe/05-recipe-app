import { TRecipe } from "@/type"

type Recipe = {
  favoriteCount: number
  img: string
  introduction: string
  name: string
  user: string
  userImg: string
}

/** @package */
export const get = (): Recipe => {
  return {
    favoriteCount: 222,
    img: "/recipe-images/recipe-1.jpg",
    introduction:
      "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
    name: "山田の特製マルゲリータ",
    user: "山田シェフ",
    userImg: "/chef.jpg",
  }
}

/** @package */
export const getDraft = (): TRecipe[] => {
  return [
    {
      id: "recipe_1",
      createdAt: "2021年01月01日",
      favoriteCount: 111,
      img: {
        key: "/recipe-images/recipe-1.jpg",
        name: "/recipe-images/recipe-1.jpg",
        url: "/recipe-images/recipe-1.jpg",
      },
      instructionList: [
        {
          description: "生地を作る",
          step: 1,
        },
        {
          description: "トマトソースを作る",
          step: 2,
        },
      ],
      isDraft: true,
      recipeItemList: [
        {
          note: "生地は薄めに伸ばす",
        },
        {
          note: "チーズはモッツァレラを使う",
        },
      ],
      recipeLinkList: [
        {
          id: "link_others_1",
          linkType: "others",
          url: "https://www.google.com/",
        },
      ],
      servings: 1,
      summary:
        "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
      title: "山田の特製マルゲリータ_1",
    },
    {
      id: "recipe_2",
      createdAt: "2021年01月01日",
      favoriteCount: 222,
      img: {
        key: "/recipe-images/recipe-1.jpg",
        name: "/recipe-images/recipe-1.jpg",
        url: "/recipe-images/recipe-1.jpg",
      },
      instructionList: [
        {
          description: "生地を作る",
          step: 1,
        },
        {
          description: "トマトソースを作る",
          step: 2,
        },
      ],
      isDraft: true,
      recipeItemList: [
        {
          note: "生地は薄めに伸ばす",
        },
        {
          note: "チーズはモッツァレラを使う",
        },
      ],
      recipeLinkList: [
        {
          id: "link_others_1",
          linkType: "others",
          url: "https://www.google.com/",
        },
      ],
      servings: 1,
      summary:
        "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
      title: "山田の特製マルゲリータ_2",
    },

    {
      id: "recipe_3",
      createdAt: "2021年01月01日",
      favoriteCount: 333,
      img: {
        key: "/recipe-images/recipe-1.jpg",
        name: "/recipe-images/recipe-1.jpg",
        url: "/recipe-images/recipe-1.jpg",
      },
      instructionList: [
        {
          description: "生地を作る",
          step: 1,
        },
        {
          description: "トマトソースを作る",
          step: 2,
        },
      ],
      isDraft: true,
      recipeItemList: [
        {
          note: "生地は薄めに伸ばす",
        },
        {
          note: "チーズはモッツァレラを使う",
        },
      ],
      recipeLinkList: [
        {
          id: "link_others_1",
          linkType: "others",
          url: "https://www.google.com/",
        },
      ],
      servings: 1,
      summary:
        "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
      title:
        "山田の特製マルゲリータ_3山田の特製マルゲリータ_3山田の特製マルゲリータ_3",
    },
  ]
}
