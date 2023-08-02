export interface DTColumn {
  field: string
  title: string
  width?: number
  class?: string
  sortable?: boolean
}

export interface DTable {
  url?: string
  data?: any[]
  columns: DTColumn[]
  disableInit?: boolean
  mapper?: any
  search?: boolean
  headers?: any
  defaultSort?: {column: string, order: 'asc' | 'desc'}
}
