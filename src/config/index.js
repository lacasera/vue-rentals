const config = env => {
  const envKeys = process.env

  if (envKeys['VUE_APP_'.concat(env)] === undefined) {
    throw new Error('No env key defined for '.concat(env))
  }
  return envKeys['VUE_APP_'.concat(env)]
}

export default config
