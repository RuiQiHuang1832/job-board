import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'

import { useURLParams } from '@/app/jobs/hooks'
import { DetailedJobProps } from '@/app/jobs/shared'

type JobFlags = { saved?: true; hidden?: true; applied?: true }
type Store = Record<string, JobFlags>

type Action =
  | { type: 'LOAD'; payload: Store }
  | { type: 'TOGGLE_SAVED'; id: string }
  | { type: 'TOGGLE_HIDDEN'; id: string }
  | { type: 'TOGGLE_APPLIED'; id: string }
const JOB_STATE_KEY = 'jobboard:v1:states'

const reducer = (state: Store, action: Action): Store => {
  switch (action.type) {
    case 'LOAD':
      return action.payload || {}
    case 'TOGGLE_SAVED': {
      const next = { ...state }
      const s = next[action.id] ? { ...next[action.id] } : {}
      if (s.saved) {
        delete s.saved
      } else {
        s.saved = true
      }
      console.log(s)
      if (Object.keys(s).length === 0) {
        delete next[action.id]
      } else {
        next[action.id] = s
      }
      return next
    }
    case 'TOGGLE_HIDDEN': {
      const next = { ...state }
      const s = next[action.id] ? { ...next[action.id] } : {}
      if (s.hidden) {
        delete s.hidden
      } else {
        s.hidden = true
      }
      if (Object.keys(s).length === 0) {
        delete next[action.id]
      } else {
        next[action.id] = s
      }
      return next
    }
    case 'TOGGLE_APPLIED': {
      const next = { ...state }
      const s = next[action.id] ? { ...next[action.id] } : {}
      if (s.applied) {
        delete s.applied
      } else {
        s.applied = true
      }
      if (Object.keys(s).length === 0) {
        delete next[action.id]
      } else {
        next[action.id] = s
      }
      return next
    }
    default:
      return state
  }
}

export const useJobOperations = (allJobs: readonly DetailedJobProps[]) => {
  const { updateURL, getParam } = useURLParams()
  const [activeJobId, setActiveJobId] = useState<string>(
    allJobs.find((job) => job.id === getParam('id'))?.id || '0',
  )
  const [isLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {})
  const writeTimer = useRef<number | null>(null)

  // persist savedJobs to localStorage (debounced)
  // load once and listen for storage changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(JOB_STATE_KEY)
      if (raw) {
        dispatch({ type: 'LOAD', payload: JSON.parse(raw) as Store })
      }
    } catch {
      /* ignore parse errors */
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === JOB_STATE_KEY) {
        try {
          dispatch({ type: 'LOAD', payload: JSON.parse(e.newValue || '{}') as Store })
        } catch {
          dispatch({ type: 'LOAD', payload: {} })
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // persist (single debounced write for all flags)
  useEffect(() => {
    if (writeTimer.current) {
      window.clearTimeout(writeTimer.current)
    }
    writeTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(JOB_STATE_KEY, JSON.stringify(state))
      } catch {
        /* ignore quota errors */
      }
      writeTimer.current = null
    }, 150)
    return () => {
      if (writeTimer.current) {
        window.clearTimeout(writeTimer.current)
        writeTimer.current = null
      }
    }
  }, [state])

  // derived sets for consumers (memoized)
  const savedJobs = useMemo(() => {
    return new Set(
      Object.entries(state)
        .filter(([, v]) => v.saved)
        .map(([id]) => id),
    )
  }, [state])

  const hiddenJobs = useMemo(() => {
    return new Set(
      Object.entries(state)
        .filter(([, v]) => v.hidden)
        .map(([id]) => id),
    )
  }, [state])

  const appliedJobs = useMemo(() => {
    return new Set(
      Object.entries(state)
        .filter(([, v]) => v.applied)
        .map(([id]) => id),
    )
  }, [state])

  const handleJobSave = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_SAVED', id })
  }, [])

  const handleJobHide = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_HIDDEN', id })
  }, [])

  const handleJobApply = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_APPLIED', id })
  }, [])

  const handleActiveJobCard = useCallback(
    (id: string) => {
      setActiveJobId(id)
      updateURL({ id })
    },
    [updateURL],
  )

  // ONLY react to history traversal - optimization
  useEffect(() => {
    const onPopState = () => {
      const id = new URLSearchParams(window.location.search).get('id') || '1'
      setActiveJobId(id)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return {
    savedJobs,
    hiddenJobs,
    activeJobId,
    appliedJobs,
    isLoading,
    handleJobSave,
    handleJobHide,
    handleActiveJobCard,
    handleJobApply,
  }
}
