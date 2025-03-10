"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-48 h-48 sm:w-56 sm:h-56">
        <DotLottieReact
          src="https://lottie.host/c68f486c-bb80-4794-99c3-df7996f7b907/A6Fcq9DWxm.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  )
}

