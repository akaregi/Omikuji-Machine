import Dexie, { Table } from 'dexie'
import { Preference } from './schema'

export class PreferenceDB extends Dexie {
  logs!: Table<Preference>

  constructor() {
    super('preferenceDB')
    this.version(1).stores({
      logs: '++id, name, traditional' // Primary key and indexed props
    })
  }
}

export const preferenceDB = (new PreferenceDB()).logs