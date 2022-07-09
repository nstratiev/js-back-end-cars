module.exports = {
    notFound(req, res) {
        res.render('404', { title: 'Not Found Page' });
        // res.render('404', { title: 'Page Not Found' });
    }
};