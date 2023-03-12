export interface DTColumn {
  field: string
  title: string
  width?: number
}

export interface DTable {
  url?: string
  data?: any[]
  columns: DTColumn[]
  disableInit?: boolean
}
