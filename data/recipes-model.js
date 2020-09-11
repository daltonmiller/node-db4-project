const db = require('./config.js')

module.exports = {
    find,
    findById,
    getShoppingList,
    getInstructions,
    add,
    update
}

function find() {
    return db("recipes");
}


function add(recipe) {
    return db('recipes')
    .insert(recipe)
    .then(ids => {
        return findById(ids[0])
    })
}
function update(id, changes) {
    return db('recipes')
    .where("id", id)
    .update(changes)
}

function findById(id) {
    return db('recipes')
    .where({ id })
    .first()
}

function getShoppingList(id) {
    return db('recipes as R')
        .join('ingredients as I', 'R.ingredients_id', 'I.id')
        .where('R.id', '=', id)
        .select('R.recipe_name', 'I.amount', 'I.unit', 'I.ingredient')
}

function getInstructions(id) {
    return db('recipes as R')
    .join('instructions as I', 'R.instructions_id', 'I.id')
    .join('steps as S', 'I.id', 'S.instructions_id')
    .where('R.id', '=', id)
    .select('S.step')
    .orderBy('S.id')
}

