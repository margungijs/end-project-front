export const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            entry.target.classList.add('stuck');
        } else {
            const bounding = entry.target.getBoundingClientRect();
            if (bounding.top > 0) {
                entry.target.classList.remove('show-animate');
                entry.target.classList.remove('stuck');
            }
        }
    });
}, {
    threshold: [0.2]
});


export const observerBottom = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio === 1) {
            entry.target.classList.add('show-animate-bot');
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('show-animate-bot');
        }
    });
}, {
    threshold: 1
});



