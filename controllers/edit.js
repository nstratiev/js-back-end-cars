module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car) {
            res.render('edit', { title: 'Edit page', car });
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;
        const receivedData = req.body;
        const newData = {
            name: receivedData.name,
            description: receivedData.description,
            imageUrl: receivedData.imageUrl,
            price: Number(receivedData.price)
        };

        try {
            await req.storage.editItem(id, newData);
            res.redirect(`/details/${id}`);

        } catch (err) {
            res.redirect('/404');
        }
    }
};