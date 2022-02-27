const axios = require('axios');
const cookieParser = require('cookie-parser')

exports.home = (req, res) => {


    // if (req.cookies['session-token']) {
    //     let token = req.cookies['session-token'];
    //     let user = {};
    //     async function verify() {
    //         const ticket = await client.verifyIdToken({
    //             idToken: token,
    //             audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    //         });
    //         const payload = ticket.getPayload();
    //         user.name = payload.name;
    //         user.email = payload.email;
    //         user.picture = payload.picture;
    //     }
    //     verify()
    //         .then(() => {
    //             req.user = user;
    //             res.render("index", { user })

    //         })
    //         .catch(err => {
    //             console.log(err)

    //         })
    // } else {
    //     res.render('index', { user: " " });
    // }


    // axios.get('http://localhost:3000/api/customer', { params: { id: req.query.id } })
    //     .then(function(userdata) {
    //         res.render("index", { user: userdata.data })
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     })





    res.render('index');
}
exports.post = (req, res) => {
    res.render('post-page');
}
exports.about = (req, res) => {
    res.render('about');
}
exports.contact = (req, res) => {
    res.render('contact');
}
exports.why = (req, res) => {
    res.render('why');
}
exports.services_provider = (req, res) => {
    res.render('services_provider');
}

exports.services_provider_list_details = (req, res) => {
    res.render('service-provider-details');
}




exports.services_2wheeler = (req, res) => {


    // let unique = arr2.filter((item, i, ar) => ar.indexOf(item) === i);
    // console.log(unique)


    res.render('service');

    // axios.get('http://localhost:3000/api/serviceprovider')
    //     .then(function(response) {
    //         print(response.data)

    //         res.render('service', { services: response.data });
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     })
}

exports.terms_conditions = (req, res) => {
    res.render('terms_conditions');
}
exports.faq = (req, res) => {
    res.render('faq');
}
exports.custom = (req, res) => {
    res.render('custom');
}
exports.forms = (req, res) => {
    res.render('forms');
}



exports.admin_dashboard = (req, res) => {
    let one = 'http://localhost:3000/api/users'
    let two = 'http://localhost:3000/api/contacts'
    let three = 'http://localhost:3000/api/serviceprovider'
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responseThree = responses[2]

        res.render('admin-dashboard', { users: responseOne['data'], contacts: responseTwo['data'], serviceproviderlist: responseThree['data'] });

        // use/access the results 
    })).catch(errors => {
        // react on errors.
        res.send(errors);
    })









    // Make a get request to /api/users
    // axios.get('http://localhost:3000/api/users')
    //     .then(function(response) {
    //         res.render('admin-dashboard', { users: response.data });
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     })
    // axios.get('http://localhost:3000/api/contacts')
    //     .then(function(response) {
    //         res.render('admin-dashboard', { contacts: response.data });
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     })


}

exports.services_4wheeler = (req, res) => {
    res.render('service4');
}
exports.login = (req, res) => {
    res.render('login');
}

exports.cart = (req, res) => {
    res.render('cart');
}

exports.privacy_policy = (req, res) => {
    res.render('privacy_policy');
}

exports.terms_conditions = (req, res) => {
    res.render('terms_conditions');
}

exports.blog = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response) {
            res.render('blog-page', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.add_blog = (req, res) => {
    res.render('add-blog');
}

exports.add_serviceprovider = (req, res) => {
    res.render('add-serviceprovider');
}

exports.update_blog = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function(userdata) {
            res.render("update-blog", { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}

exports.update_serviceprovider = (req, res) => {
    axios.get('http://localhost:3000/api/serviceprovider', { params: { id: req.query.id } })
        .then(function(userdata) {
            res.render("update-serviceprovider", { details: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })

}



exports.services_provider_list = (req, res) => {
    axios.get('http://localhost:3000/api/serviceprovider', { params: { service: req.query.service } })
        .then(function(userdata) {
            console.log("render")

            console.log(req.query.service)

            if (userdata.data[0] === undefined) {
                message = "There is no vendor for this service !"
            } else {
                message = ""
            }
            res.render("service-providers-list", { user: userdata.data, message: message })
        })
        .catch(err => {
            res.send(err);
        })
}

exports.post_page = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function(userdata) {
            res.render("post-page", { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}

exports.service_provider_details = (req, res) => {
    axios.get('http://localhost:3000/api/serviceprovider', { params: { id: req.query.id } })
        .then(function(userdata) {
            console.log(userdata.data[0])
            res.render("service-provider-details", { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}