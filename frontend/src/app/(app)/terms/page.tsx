import React from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { TermsPageHeader } from "@/app/(app)/terms/_component"

export const metadata = {
  title: "設定",
}

export default function SettingsPage() {
  return (
    <div>
      <TermsPageHeader />
      <ContentContainer>
        <div className="text-mauve-normal">
          <div className="py-3 font-bold">第一項</div>
          <div>
            吾輩は猫である。名前はまだない。
            どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
          </div>
          <div>
            吾輩は猫である。名前はまだない。
            どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
          </div>
          <div className="py-3 font-bold">第二項</div>
          <div>
            吾輩は猫である。名前はまだない。
            どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
          </div>
          <div>
            吾輩は猫である。名前はまだない。
            どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}
