import Dexie, { Table } from 'dexie'
import { OmikujiResult } from './schema'

export class OmikujiResultDB extends Dexie {
  logs!: Table<OmikujiResult>

  constructor() {
    super('omikujiResultDB')
    this.version(1).stores({
      logs: '++id, date, name, result' // Primary key and indexed props
    })
  }
}

export const omikujiResultDB = (new OmikujiResultDB()).logs