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