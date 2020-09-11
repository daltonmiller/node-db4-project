
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        { id: 1, step: 'get pan.', instructions_id: 1 },
        { id: 2, step: 'mix stuff.', instructions_id: 1 },
        { id: 3, step: 'put in oven.', instructions_id: 1 },
        { id: 4, step: 'eat.', instructions_id: 1 }
      ]);
    });
};