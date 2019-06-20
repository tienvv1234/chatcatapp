WebSockets
a tcp socket
uses ws or wss protocol
asynchronous
both client and socket can push content

- an API that implements WebSockets
- Ability to fallback on long polling (XHR) if WebSockets is not available.
- Implementations for NodeJS, IOS, Android and C++.
- Implements automatic data compression for optimal speeds and efficiency.
- Ability to detect disconnections with automatic reconnection support.
- buffers up data if connection unstable
- easy to use

workflow

- Client attempts to contact the server using either XHR or WebSockets
- Client handshakes with the server
- On successful handshake, the protocol is upgraded to websockets, a session ID is assigned and a transport socket is created
- Data can be sent bi-directionally over this socket now
- A heartbeat mechanism keeps a check on connectivity across sockets
- If disconnection is detected --> step 2

socket IO using event mechanism

redis

- A high performance key-value data store.
- Stores in memory with disk based persistence.
- Can be used as a super fast cache or store.
- Can be used for storing sessions, socket buffers etc.
- Can scale as a cluster.
- Doesn't run out of storage unlike ram
- doesn't lose data on restart

heroku create `create app in heroku`

heroku git:remote -a `name app` update the Heroku Git URL
