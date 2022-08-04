// Làm cho những page chỉ duy nhất nó mà ko có slug
const Course = require('../model/Courses');

class SiteController {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) =>
                res.render('home', {
                    courses,
                })
            )
            .catch(next);
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
