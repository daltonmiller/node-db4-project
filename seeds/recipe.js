exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { id: 1, recipe_name: 'chocolate cake', ingredients_id: 1, instructions_id: 1 },
      ]);
    });
};