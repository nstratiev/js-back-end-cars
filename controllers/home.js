module.exports = {
    async home(req, res) {
        const data = await req.storage.getAll(req.query);
        // console.log(data);
        // res.locals = {
        //     data
        // };
        res.render('index', { title: 'Home Page', data, query: req.query });
    }
};