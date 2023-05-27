import {faker} from '@faker-js/faker';
import _ from 'lodash'

const dataLength = 10
const users = []

for (let i = 0; i < dataLength; i++) {
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  })
}

console.log(users)

const sortByNames = _.orderBy(users, ['name'], ['asc']);
console.log("sortByNames")

console.log(sortByNames)


