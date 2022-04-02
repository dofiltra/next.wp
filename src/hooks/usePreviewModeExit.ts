import { useEffect } from 'react'
import axios from 'axios'

export const usePreviewModeExit = () => {
  useEffect(() => {
    void axios.post('/api/exit-preview')
  }, [])
}
