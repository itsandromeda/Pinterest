(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const getJSON = (url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status !== 200) {
            return cb(new Error('Error loading JSON from ' + url + '(' + xhr.status + ')'));
        }
        cb(null, xhr.response);
    });
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
};

const render = (root) => {
    root.empty();
    const container = $('<div class="container-fluid"></div>'),
          avatar = $('.avatar'),
          pins = $('.pins'),
          followers = $('.followers');
    avatar.append(image());
    pins.append(pinNum());
    followers.append(followNum());
    $.each(state.board.data, function (i, element) {
        const div = $('<div class="item"></div>');
        const imagen = $('<img src="' + element.image.original.url + '" alt="">');
        const descripcion = $('<p class="info">' + element.note + '</p>');

        div.append(imagen);
        div.append(descripcion);        
        container.append(div);
        root.append(container);
    });
}


const state = {
    board: null,
    user: null,
    follow: null,
    descripcion: null
};

//Board imagenes y descripcion
$(_ => {
    getJSON('https://api.pinterest.com/v1/boards/arabelyuska/web-ui/pins/?access_token=AQ6wsInV6BsgRR4gFb7NitJJBjjvFM4qT4K8JqlEI1oqT0A7nAAAAAA&fields=id%2Clink%2Cnote%2Curl%2Ccreated_at%2Ccounts%2Ccolor%2Cboard%2Cattribution%2Cmedia%2Cmetadata%2Ccreator%2Cimage%2Coriginal_link', (err, json) => {
        if (err) {
            return alert(err.message);
        }
        state.board = json; /*Trae toda la data*/
        const root = $('.root');
        render(root);
    });
});
// imagen de usuario
getJSON('https://api.pinterest.com/v1/users/arabelyuska/?access_token=AQ6wsInV6BsgRR4gFb7NitJJBjjvFM4qT4K8JqlEI1oqT0A7nAAAAAA&fields=first_name%2Cid%2Clast_name%2Curl%2Cusername%2Caccount_type%2Cbio%2Ccounts%2Ccreated_at%2Cimage', (err, json) => {
    if (err) {
        return alert(err.message);
    }
    state.user = json; /*Trae toda la data*/
    console.log(json.data.image['60x60'].url);
});
// pines y seguidores del Board
getJSON('https://api.pinterest.com/v1/boards/arabelyuska/web-ui/?access_token=AQ6wsInV6BsgRR4gFb7NitJJBjjvFM4qT4K8JqlEI1oqT0A7nAAAAAA&fields=id%2Cname%2Curl%2Cimage%2Cdescription%2Ccreator%2Ccounts%2Ccreated_at%2Cprivacy%2Creason', (err, json) => {
    if (err) {
        return alert(err.message);
    }
    state.follow = json; /*Trae toda la data*/
    console.log(json.data.creator.first_name);
    console.log(json.data.name);
    console.log(json.data.counts.followers);
    console.log(json.data.counts.pins);
});
const image = () => {
    const container = $('<img class="img-circle" src="' + state.user.data.image['60x60'].url + '" alt="">');

    return container;

};

const pinNum = () => {
    const num = $('<p><strong><span>' + state.follow.data.counts.followers + ' </span></strong> Followers</p>');

    return num;

};

const followNum = () => {
    const num = $('<p><strong><span>' + state.follow.data.counts.pins + '</span></strong> Pins</p>');

    return num;

};


},{}]},{},[1])