module.exports = {
    get(req, res) {
        res.render('create', { title: 'Create Page' });
    },
    async post(req, res) {
        const receivedData = req.body;
        const newData = {
            name: receivedData.name,
            description: receivedData.description,
            imageUrl: receivedData.imageUrl,
            price: Number(receivedData.price)
        };

        await req.storage.createItem(newData);
        res.redirect('/');
    }
};