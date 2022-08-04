// Làm cho những page chỉ duy nhất nó mà ko có slug
const Course = require('../model/Courses');

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                res.render('courses/show', {
                    course,
                });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        try {
            if (req.body) {
                const course = new Course(req.body);
                course
                    .save()
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch((err) => console.log('error', err));
            }
        } catch {
            (err) => console.log('error in sava course', err);
        }
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        if (req.params) {
            Course.findById(req.params.id)
                .lean()
                .then((course) => {
                    res.render('courses/edit', { course });
                })
                .catch(next);
        }
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        if (!req.params) {
            res.send('error in update courses');
            return;
        }
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        if (!req.params) {
            res.send('error in delete courses');
            return;
        }
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        if (!req.params) {
            res.send('error in force delete courses');
            return;
        }
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        if (!req.params) {
            res.send('error in restore courses');
            return;
        }
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /courses/handleFormAction
    handleFormAction(req, res, next) {
        if (!req.body) {
            res.send('error in restore courses');
            return;
        }
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: req.body.courseIds })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}
module.exports = new CourseController();
