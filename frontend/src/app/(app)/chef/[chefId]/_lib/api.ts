import { baseUrl } from "@/mock"

import { Chef } from "@/app/(app)/_component/header"

/** @package */
export const getChef = async (chefId: string): Promise<Chef> => {
  const res = await fetch(`${baseUrl}/chef/${chefId}`, {
    method: "GET",
  })
  return (await res.json()) as Chef
}
