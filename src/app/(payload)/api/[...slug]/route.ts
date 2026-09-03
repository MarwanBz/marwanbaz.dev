/* THIS FILE IS OWNED BY PAYLOAD — mounts the REST API at /api. */

import { REST_DELETE, REST_GET, REST_OPTIONS, REST_POST } from '@payloadcms/next/routes'

import config from '@payload-config'

const DELETE = REST_DELETE(config)
const GET = REST_GET(config)
const OPTIONS = REST_OPTIONS(config)
const POST = REST_POST(config)

export { DELETE, GET, OPTIONS, POST }
