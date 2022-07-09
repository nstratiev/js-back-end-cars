module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car) {
            res.render('delete', { title: 'Delete page', car });
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            await req.storage.deleteItem(id);
            console.log(`Deletion confirmed, ${id}`);
            res.redirect('/');

        } catch (err) {
            res.redirect('/404');
        }
    }
};