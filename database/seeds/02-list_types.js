
exports.seed = function(knex) {
      return knex('listType').insert([
        {name:'to-do'},
        {name:'work'},
        {name:'shopping'}
      ]);
};
