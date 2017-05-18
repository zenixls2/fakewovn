(function () {
  var result = {};
  var translatedSet = {};
  var getPathTo = function(element) {
    if (element.tagName === 'HTML')
      return '/HTML[1]';
    if (element === document.body)
      return '/HTML[1]/BODY[1]';
    var ix = 0;
    var siblings = ((element.parentNode || {}).childNodes || []);
    for (var i=0; i<siblings.length; i++) {
      var sibling = siblings[i];
      if (sibling === element)
        return getPathTo(element.parentNode) + '/' +
                element.tagName + '[' + (ix+1) + ']';
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
        ix++;
    }
    return '/'
  }

  var translate = function(str, from ,to, callback) {
    str = encodeURIComponent(str);
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://mymemory.translated.net/api/get?q='+str+'&langpair='+from+'|'+to,
      true)
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (xhr.status == 200) {
        var result = xhr.response;
        if (result.matches.length > 0) {
          callback(result.matches[0].translation);
        }
      }
    };
    xhr.send();
  }
  var getText = function(pxp, node) {
    var xp = node.nodeName;
    if (node.nodeName.match(/SCRIPT|NOSCRIPT|STYLE/))
      return;
    if (node.nodeName === '#text') {
      if (/^\s+$/.test(node.nodeValue)) {
        return;
      }
      var old = node.data;
      // what about update??
      if (result[pxp + '/text()'])
        return
      if (translatedSet[node.data]) {
        node.data = translatedSet[node.data];
        console.log(old, node.data);
      } else {
        translate(node.data, 'en', 'ja', function(data) {
          node.data = data;
          translatedSet[old] = node.data;
          /*if (data.matches.length > 0) {
            node.data = data.matches[0].translation;
            translatedSet[old] = node.data;
          }*/
        });
      }
      result[pxp + '/text()'] = old;
    } else {
      var types = {};
      for (var i=0; i<node.childNodes.length; i++) {
        var nodeName = node.childNodes[i].nodeName;
        if (nodeName === '#text') {
          getText(pxp, node.childNodes[i]);
          continue;
        }
        types[nodeName] = (types[nodeName] || 0) + 1;
        getText(pxp + '/' + nodeName + '[' + types[nodeName] + ']',
                node.childNodes[i]);
      }
    }
  }
  var previousIndex = 0;

  // Dynamic content crawling
  getText('', document.getElementsByTagName('html')[0]);
  var observer = new MutationObserver(function(mutations) {
    mutations.slice(previousIndex).forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        for (var j=0; j<mutation.addNodes.length; j++) {
          var node = mutation.addedNodes[j]
          var path = getPathTo(node);
          console.log(path);
          getText(path, node);
        }
      }
    });
    previousIndex = mutations.length;
  })
  var config = {attributes: true, childList: true, subtree: true,
                characterData: true};
  observer.observe(document.getElementsByTagName('html')[0], config);
})();
// var body = document.getElementsByTagName('body')[0]; var script = document.createElement('script'); script.src="https://localhost:8443/lib.js"; body.appendChild(script);
