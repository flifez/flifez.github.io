document.addEventListener('DOMContentLoaded', function() {
    var navTrigger = document.querySelector('.nav-trigger');
    if (navTrigger) {
        navTrigger.addEventListener('change', function() {
            var pageLinks = document.querySelectorAll('.page-link');
            pageLinks.forEach(function(pageLink) {
                if (this.checked) {
                    setTimeout(function() {
                        pageLink.classList.add('checked');
                    }, 100); // delay in milliseconds
                } else {
                    pageLink.classList.remove('checked');
                }
            }.bind(this));
        });
    }
});