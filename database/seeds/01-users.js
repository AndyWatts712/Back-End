
exports.seed = function(knex) {
      return knex('users')
        .insert([
          {
            username:'superuser',
            email:'superuser@testing.com',
            password:'$2y$10$rI/1pAvqtHKNsnfw1t7o0udf5gIiUqBfYEVjVqoqoo/l.Pbh.pt8O'
            //password is password
          },
        ]);
};
