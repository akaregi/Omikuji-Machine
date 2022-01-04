export interface OmikujiResult {
  id?: number
  date: number // Date.now() expected
  name: string
  result: string
}

export interface Preference {
  id?: number
  name: string
  useCommon: boolean
  useMarkdown: boolean,
  showCount: boolean
}