document.getElementById('cars').addEventListener('click', ({ target }) => {
    if (target.classList.contains('more')) {
        const descr = target.parentElement.querySelector('.description');
        // console.log(descr);
        // console.log(descr.style.display);
        // console.log(window.getComputedStyle(descr).display);
        const cssDisplay = window.getComputedStyle(descr).display;

        if (cssDisplay === 'none') {
            descr.style.display = 'block';
            target.textContent = 'Hide';
        } else {
            descr.style.display = 'none';
            target.textContent = 'Show more';
        }
    }
});
// alert('ghgkj');