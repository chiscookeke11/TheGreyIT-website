import post from './post'
import { createSchema } from 'sanity'

export default createSchema({
  name: 'default',
  types: [post]
})