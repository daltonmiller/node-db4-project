const express = require('express')
const knex = require('knex')
const db = require("./config")
const Recipes = require('./recipes-model')

const router = express.Router()

router.get('/', (req, res) => {
    Recipes.find()
    .then(recipes => {
      res.json(recipes);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get recipes' });
    });
  });

 

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Recipes.findById(id)
    .then(recipes => {
      if (recipes) {
        res.json(recipes);
      } else {
        res.status(404).json({ message: 'Could not find recipes with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get recipess' });
    });
  });


// router.post('/', (req, res) => {
//     const recipeData = req.body;
//     Recipes.add(recipeData)
//     .then(recipe => {
//       res.status(201).json(recipe);
//     })
//     .catch (err => {
//       res.status(500).json({ message: 'Failed to create new recipe' });
//     });
//   });
router.post("/", (req, res) => {
    const recipeData = req.body

    db("recipes")
    .insert(recipeData)
    .returning("id")
    .then(ids => {
        res.status(200).json({data: ids})
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Recipes.findById(id)
    .then(recipe => {
      if (recipe) {
        Recipes.update(changes, id)
        .then(updatedrecipe => {
          res.json(updatedrecipe);
        });
      } else {
        res.status(404).json({ message: 'Could not find recipe with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update recipe' });
    });
  });
  

router.get('/:id/shoppingList', (req, res) => {
    Recipes.getShoppingList(req.params.id)
        .then(recipes => res.status(200).json(recipes))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/:id/instructions', (req, res) => {
    Recipes.getInstructions(req.params.id)
    .then(recipes => res.status(200).json(recipes))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router
