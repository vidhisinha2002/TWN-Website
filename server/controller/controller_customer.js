const Customerdb = require('../model/model_customer')

exports.register_customer = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new user
    const cont = new Customerdb({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })


    // save user in the database
    cont
        .save(cont)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}

exports.login_customer = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // const password: req.body.password
    Customerdb.findOne({ email: req.body.email })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id })
            } else {
                password = req.body.password
                if (data["password"] == password) {
                    res.redirect('/');
                } else {
                    res.status(403).send({ message: "Wrong Password" });

                }
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving user with id " + id })
        })

}
exports.find = (req, res) => {

    const id = req.query.id;

    Customerdb.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving user with id " + id })
        })


}