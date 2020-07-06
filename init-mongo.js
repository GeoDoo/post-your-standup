db.auth('standup', 'lefteris')

db = db.getSiblingDB('standup')

db.createUser({
  user: 'lala',
  pwd: 'lalakis',
  roles: [
    {
      role: 'readWrite',
      db: 'standup',
    },
  ],
})
