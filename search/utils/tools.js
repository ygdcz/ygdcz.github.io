function trimSpace(str) {
  return str.replace(/\s+/, '');
}

function tplReplace(tpl, replaceObject) {
  return tpl.replace(/{{(.*?)}}/g, function(node, key) {
    return replaceObject[key];
  })
}
