import React, { ReactNode } from "react"
import { type Metadata } from "next"

import { ChefPageDetail } from "@/app/(app)/chef/[chefId]/_component"

type ChefDetailLayoutProps = {
  children: ReactNode
  params: {
    chefId: string
  }
}

export const generateMetadata = async ({
  params: { chefId },
}: ChefDetailLayoutProps): Promise<Metadata> => {
  const response = await fetch(`http://localhost:3000/chef/${chefId}/api`, {
    cache: "no-store",
  })
  const chefData = await response.json()

  return {
    openGraph: {
      images: [chefData.img],
    },
    title: `一流レシピ | ${chefData.name}`,
  }
}

export default async function ChefDetailLayout(props: ChefDetailLayoutProps) {
  const {
    children,
    params: { chefId },
  } = props

  const response = await fetch(`http://localhost:3000/chef/${chefId}/api`, {
    cache: "no-store",
  })
  const chefData = await response.json()

  return (
    <div>
      <ChefPageDetail data={chefData} />
      {children}
    </div>
  )
}
