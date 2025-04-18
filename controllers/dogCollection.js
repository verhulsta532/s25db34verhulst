var Dog = require ('../models/dog')

exports.dog_list = async function(req, res) {
    try {
        console.log("here");
        const dog = await Dog.find();
        res.json(dog);  // Send JSON response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.dog_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Dog.findById(req.params.id);
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send('{"error":document for id ${req.params.id} not found');
    }
};

// Handle costume create on POST
exports.dog_create_post = async function(req, res) {
    console.log("Create post" + req.params.id)
    try {
        result = await Dog.findById(req.params.id);
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send('{"error":document for id ${req.params.id} not found');
    }
};

// Handle costume update on PUT
exports.dog_update_put = async function(req, res) {
    console.log("Update" + req.params.id)
    try {
        result = await Dog.findById(req.params.id);
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send('{"error":document for id ${req.params.id} not found');
    }
};

// Handle costume delete on DELETE
exports.dog_delete = async function(req, res) {
    console.log("delete" + req.params.id)
    try {
        result = await Dog.findById(req.params.id);
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send('{"error":document for id ${req.params.id} not found');
    }
};

exports.dog_view_all_Page = async function(req, res) {
    console.log("single view for id" + req.query.id)
    try{
        results = await Dog.findById(req.query.id);
        res.render('dog', { title: 'Dog Search Results', results: theDogs });
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
    };
    
    
    