import { useMemo, useState } from 'react'
const JOB_STATE_KEY = 'jobboard:v1:states'

export default function useLocalStorageIds(status: string) {
  const [ids] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(JOB_STATE_KEY)
      if (!raw) return []

      const data = JSON.parse(raw)

      // collect keys that contain the current status
      return Object.keys(data).filter((id) => status in data[id])
    } catch {
      return []
    }
  })
  const idsSet = useMemo(() => new Set(ids), [ids])

  return {  idsSet }
}
