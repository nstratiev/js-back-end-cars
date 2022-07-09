module.exports = {
    async details(req, res) {
        const id = req.params.id;
        // console.log(id);
        const data = await req.storage.getById(id);
        console.log(data);
        res.render('details', { title: 'Details Page', data });
    }
};