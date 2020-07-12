db.createUser({
  user: 'standup',
  pwd: 'lefteris',
  roles: [
    {
      role: 'readWrite',
      db: 'standup',
    },
  ],
})
