// import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// export const lng = atom('eng')
export const lng = atomWithStorage('lng', 'eng')