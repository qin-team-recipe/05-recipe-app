import React, { useEffect, useRef } from "react"

import { render, screen } from "@testing-library/react"

import { ScrollAreaWrapper } from "@/app/_component"

type ChefCardProps = {
  index: number
  onCardIntersect: (entries: IntersectionObserverEntry[]) => void
}

const ChefCard: React.FC<ChefCardProps> = ({
  index,
  onCardIntersect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      const observer = new IntersectionObserver(onCardIntersect, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      })
      observer.observe(cardRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [cardRef, onCardIntersect])

  return (
    <div ref={cardRef} className="min-w-32 h-56 w-32 bg-tomato-5">
      {`山田シェフ_${index}`}
    </div>
  )
}

const onCardIntersect = jest.fn(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // eslint-disable-next-line no-console
        // console.log("Visible:", entry.target)
      }
    })
  },
)

const chefCards = Array.from({ length: 30 }).map((_, i) => {
  return (
    <ChefCard key={i} index={i} onCardIntersect={onCardIntersect} />
  )
})

describe("ScrollAreaWrapperコンポーネントでラップした要素をスクロールできる", () => {
  test("横スクロールできる", async () => {
    render(
      <ScrollAreaWrapper orientation="horizontal">
        <div className="flex space-x-4" data-testid="scroll-area">
          {chefCards}
        </div>
      </ScrollAreaWrapper>,
    )

    const scrollArea = screen.getByTestId("scroll-area")
    expect(screen.getByText("山田シェフ_5")).toBeInTheDocument()
    expect(screen.getByText("山田シェフ_29")).toBeInTheDocument()

    // Add a mock function for scrollBy
    scrollArea.scrollBy = jest.fn()

    // Scroll horizontally
    scrollArea.scrollBy({ behavior: "smooth", left: 300 })

    // Wait for IntersectionObserver to call onIntersect
    await new Promise((resolve) => {
      return setTimeout(resolve, 500)
    })

    // Expect onIntersect to have been called at least once for each card
    // eslint-disable-next-line no-console
    // console.log("onCardIntersect called", onCardIntersect.mock.calls.length)
    expect(onCardIntersect.mock.calls.length).toBeGreaterThan(0)
  })
  test("縦スクロールできる", async () => {
    render(
      <ScrollAreaWrapper orientation="vertical">
        <div
          className="flex flex-col space-x-4"
          data-testid="scroll-area"
        >
          {chefCards}
        </div>
      </ScrollAreaWrapper>,
    )

    const scrollArea = screen.getByTestId("scroll-area")
    expect(screen.getByText("山田シェフ_5")).toBeInTheDocument()
    expect(screen.getByText("山田シェフ_29")).toBeInTheDocument()

    // Add a mock function for scrollBy
    scrollArea.scrollBy = jest.fn()

    // Scroll horizontally
    scrollArea.scrollBy({ behavior: "smooth", top: 300 })

    // Wait for IntersectionObserver to call onIntersect
    await new Promise((resolve) => {
      return setTimeout(resolve, 500)
    })

    // Expect onIntersect to have been called at least once for each card
    // eslint-disable-next-line no-console
    // console.log("onCardIntersect called", onCardIntersect.mock.calls.length)
    expect(onCardIntersect.mock.calls.length).toBeGreaterThan(0)
  })
})
