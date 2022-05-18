import { ref } from '@vue/composition-api'

export default function usePromise(fn) {
  const results = ref(null)
  const loading = ref(null)
  const error = ref(null)

  const createPromise = async (...args) => {
    loading.value = true
    error.value = null
    results.value = null
    try {
      results.value = await fn(...args)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { results, loading, error, createPromise }
}
