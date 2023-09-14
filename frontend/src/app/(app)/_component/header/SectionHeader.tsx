import React, { FC } from "react"
import Link from "next/link"

import { SubButtonLink } from "@/app/(app)/_component/header"

type SectionHeaderProps = {
  label: string
  subButtonLink?: SubButtonLink
}

/** @package */
export const SectionHeader: FC<SectionHeaderProps> = (props) => {
  const { label, subButtonLink } = props

  return (
    <div className="flex items-end justify-between font-bold">
      <h3 className="text-mauve-normal font-zenAntique text-xl">{label}</h3>
      {subButtonLink ? (
        <div className="text-mauve-dim">
          <Link href={subButtonLink.href}>{subButtonLink.label}</Link>
        </div>
      ) : null}
    </div>
  )
}
