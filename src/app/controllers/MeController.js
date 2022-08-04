const Course = require('../model/Courses');

class MeController {
    //[GET] /me/stored/courses
    // storedCourses(req, res, next) {
    //     Promise.all([Course.find({}), Course.countDocumentsDeleted()])
    //         .then(([courses, deletedCount]) => {
    //             res.render('me/stored-courses', {
    //                 deletedCount,
    //                 courses,
    //             });
    //         })
    //         .catch(next);

    storedCourses = (req, res, next) => {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            const isValidType = ['asc', 'desc'].includes(req.query.type);
            courseQuery = courseQuery.sort({
                [req.query.column]: isValidType ? req.query.type : 'desc',
            });
        }
        courseQuery
            .lean()
            .then((courses) => {
                Course.countDocumentsDeleted()
                    .lean()
                    .then((deletedCount) => {
                        res.render('me/stored-courses', {
                            courses,
                            deletedCount,
                        });
                    })
                    .catch((err) => {
                        console.log('error in get deleted count');
                        return next(err);
                    });
            })
            .catch((err) => {
                console.log('error in get courses');
                return next(err);
            });
    };

    // Course.find({})
    //     .lean()
    //     .then((courses) =>
    //         res.render('me/stored-courses', {
    //             courses,
    //         })
    //     )
    //     .catch(next);

    // Course.countDocumentsDeleted()
    //     .lean()
    //     .then((deletedCount) => {})
    //     .catch(next);
    // }

    //[GET] /me/trash/courses

    deletedCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses,
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
