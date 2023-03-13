export interface DTColumn {
  field: string
  title: string
  width?: number
  class?: string
}

export interface DTable {
  url?: string
  data?: any[]
  columns: DTColumn[]
  disableInit?: boolean
  mapper?: any
}
