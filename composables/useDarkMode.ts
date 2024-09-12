

export function useDarkMode() {
  const darkModeCookie: { value: boolean } = useCookie('isDarkMode', {
    default: () => false,
  })

  const isDarkMode = computed({
    get: () => darkModeCookie.value,
    set: (value: boolean) => {
      darkModeCookie.value = value
    },
  })

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    isDarkMode,
    toggleDarkMode,
  }
}