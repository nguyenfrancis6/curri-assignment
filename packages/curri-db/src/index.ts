export * from './lib/curri-db'

import * as Users from './models/Users'
import * as Deliveries from './models/Deliveries'
import * as Addresses from './models/Addresses'

const Models = {
    Users,
    Deliveries,
    Addresses,
}

export {
    Models
}