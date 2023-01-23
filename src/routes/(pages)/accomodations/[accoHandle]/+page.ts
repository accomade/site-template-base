import type { LoadEvent } from "@sveltejs/kit"
export const prerender = true
export const ssr = true

export const load = ({ params }:LoadEvent) => {
  return {
    ...params
  }
}