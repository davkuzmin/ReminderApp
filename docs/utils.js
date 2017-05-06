function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getYoutubeEmbedLink(url) {
  return 'https://www.youtube.com/embed/' + getYoutubeVideoId(url);
}

function getYoutubeVideoId(link) {
    let url = link.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      return url[2].split(/[^0-9a-z_\-]/i)[0];
    }
    else {
      return url[0];
    }
}
