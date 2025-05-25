db.createUser({
  user: 'confi',
  pwd: 'confi',
  roles: [
    {
      role: 'readWrite',
      db: 'confi',
    },
  ],
});
