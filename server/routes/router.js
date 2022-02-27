const express = require('express');
const route = express.Router()
const multer = require('multer')
const services = require('../services/render');
const controller = require('../controller/controller');
const controller_contact = require('../controller/controller_contact');
const controller_customer = require('../controller/controller_customer');
const controller_serviceprovider = require('../controller/controller_serviceprovider');
const cookieParser = require('cookie-parser')


const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '863731282572-82p62ug594e2muve39hi6fund88kmi7v.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

//To pass token to backend in json format
route.use(express.json());

// To pass a session in diffrent page
route.use(cookieParser());





const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/upload/')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {

        cb(null, false)

    }


}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: fileFilter

});


function checkAuthenticated(req, res, next) {

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
        .then(() => {
            req.user = user;
            next();
        })
        .catch(err => {
            res.redirect('/login')
        })

}

route.get('/profile', checkAuthenticated, (req, res) => {
    let user = req.user;
    res.render('profile', { user });
})

//home page route

route.get('/', (req, res) => {

    if (req.cookies['session-token']) {
        let token = req.cookies['session-token'];

        let user = {};
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();
            user.name = payload.name;
            user.email = payload.email;
            user.picture = payload.picture;
        }
        verify()
            .then(() => {
                req.user = user;
                res.render('index', { user });
            })
            .catch(err => {
                res.redirect('/login')
            })



    } else {
        res.render("index")
    }

})


route.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/')

})



// adbout section route
route.get('/about', services.about)

// contact page section route
route.get('/contact', services.contact)

// route for services for 2 wheeler
route.get('/services_2wheeler', services.services_2wheeler)

// route for services for 4 wheeler
route.get('/services_4wheeler', services.services_4wheeler)

//blog post route
route.get('/post', services.post)

//blog route
route.get('/blog', services.blog)

//why choose us page route
route.get('/why', services.why)

// route for services for 4 wheeler
route.get('/services_provider', services.services_provider)

// route for services for 4 wheeler
route.get('/services_provider_list', services.services_provider_list)

//cart page route
route.get('/cart', services.cart)

//service provider details page route
route.get('/services_provider_list_details', services.services_provider_list_details)

//admin dashboard page route
route.get('/admin_dashboard', services.admin_dashboard)

route.get('/update-blog', services.update_blog)

route.get('/update-serviceprovider', services.update_serviceprovider)

route.get('/post-page', services.post_page)

route.get('/add-blog', services.add_blog)

route.get('/login', services.login)

route.get('/terms-conditions', services.terms_conditions)

route.get('/privacy-policy', services.privacy_policy)


route.get('/add-serviceprovider', services.add_serviceprovider)

route.get('/faq', services.faq)

route.get('/custom', services.custom)

route.get('/forms', services.forms)





route.get('/service-provider-details', services.service_provider_details)



//Google auth login route
route.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

})




// API for blogs
route.post('/api/users', upload.single('avatar'), controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// API for contacts
route.post('/api/contacts', controller_contact.create);
route.get('/api/contacts', controller_contact.find);

// API for customers
route.post('/api/register_customer', controller_customer.register_customer);
route.post('/api/login_customer', controller_customer.login_customer);
route.post('/api/customer/:id', controller_customer.find);

// API for service providers

var uploadMultiple = upload.fields([{ name: 'aadhar_avatar', maxCount: 4 }, { name: 'license_avatar', maxCount: 4 }, { name: 'technician_avatar', maxCount: 4 }, { name: 'garage_avatar', maxCount: 4 }, { name: 'electricity_avatar', maxCount: 1 }, { name: 'agreement_avatar', maxCount: 1 }])

route.post('/api/serviceprovider', uploadMultiple, controller_serviceprovider.create);
route.get('/api/serviceprovider', controller_serviceprovider.find);
route.put('/api/serviceprovider/:id', controller_serviceprovider.update);
route.delete('/api/serviceprovider/:id', controller_serviceprovider.delete);





module.exports = route