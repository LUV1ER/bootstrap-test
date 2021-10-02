$('.carousel').carousel('cycle')({
    interval: 1000
});

$(document).ready(function() {
    $('dropdown-toggle').dropdown()
});

$(document).ready(function() {

    $('div.comment-container').comment({
        title: 'Comments',
        url_get: 'articles/id/1/comments/list',
        url_input: 'articles/id/1/comments/input',
        url_delete: 'articles/id/1/comments/delete',
        limit: 10,
        auto_refresh: false,
        refresh: 10000,
        transition: 'slideToggle',
    });

});
