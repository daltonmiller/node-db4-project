
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        { id: 1, amount: '1', unit: '2', ingredient: 'coco powder' },
        { id: 2, amount: '2', unit: '1', ingredient: 'Sugger' }
      ]);
    });
};