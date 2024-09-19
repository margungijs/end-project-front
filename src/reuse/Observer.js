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
    threshold: [0.5]
});



export const observerBottom = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio === 1) {  // When the element is fully visible
            entry.target.classList.add('show-animate-bot');
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // If the element is not intersecting and scrolled up past it, remove the class
            entry.target.classList.remove('show-animate-bot');
        }
    });
}, {
    threshold: 1 // The callback triggers when the element is fully visible
});



