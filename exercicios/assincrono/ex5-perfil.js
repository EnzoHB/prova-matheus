function comTimeout(p, ms) {
  const t = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))
  return Promise.race([p, t])
}

async function carregarPerfil(id) {
  try {
    const fluxo = (async () => {
      const r = await fetch(`/api/user/${id}`)
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const user = await r.json()
      const [posts, amigos] = await Promise.allSettled([
        fetch(`/api/posts/${id}`).then((x) => x.json()),
        fetch(`/api/amigos/${id}`).then((x) => x.json()),
      ])
      return {
        user,
        posts: posts.status === 'fulfilled' ? posts.value : [],
        amigos: amigos.status === 'fulfilled' ? amigos.value : [],
      }
    })()
    return await comTimeout(fluxo, 4000)
  } catch (e) {
    console.error('Perfil falhou:', e.message)
    return null
  }
}

carregarPerfil(1).then((perfil) => console.log(perfil))
