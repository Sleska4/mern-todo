const {Router} = require('express');
const router = Router();
const Todo = require('../modals/Todo');
router.post('/add', async(req, res) => {
    try{
        const {text, userId} = req.body;

        const todo = await new Todo({
            text,
            owner: userId,
            complited: false,
            important: false
        });

        await todo.save();

        res.json(todo);
    } catch(err){
        console.log(err)
    }
})


router.get('/', async(req, res) => {
    try{
        const {userId} = req.query;

        const todo = await Todo.find({ owner: userId });

        res.json(todo);

    } catch(err){
        console.log(err)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try{
        const todo = await Todo.findOneAndDelete({_id: req.params.id});
        res.json(todo)
    } catch(err){
        console.log(err, req.params)
    }
})


router.put('/important/:id', async (req, res) => {
    try{
        const todo = await Todo.findOne({_id: req.params.id});
        todo.important = !todo.important;
        await todo.save();
        res.json(todo);
    } catch(err){
        console.log(err)
    }
})

router.put('/complited/:id', async (req, res) => {
    try{
        const todo = await Todo.findOne({_id: req.params.id});
        todo.complited = !todo.complited;
        await todo.save();
        res.json(todo);
    } catch(err){
        console.log(err)
    }
})


module.exports = router;