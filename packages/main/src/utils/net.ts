import net from 'net'

export async function isPortOccupied(port: number) {
  const server = net.createServer().listen(port)
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      console.log(`[Net] port:${port} can use.`)
      server.close()
      resolve(false)
    })

    server.on('error', err => {
      // @ts-check
      console.log(err)

      if (err.code === 'EADDRINUSE') {
        resolve(true)
        console.log(`[Net] port:${port} is occupied!`)
      } else {
        reject(err)
      }
    })
  })
}
