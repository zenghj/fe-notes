// https://github.com/leizongmin/js-xss/blob/master/README.zh.md
function escapeHtml (html) {
  return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// https://gist.github.com/ThaddeusJiang/ab9d4557ffb85a212b9005f46ace24de
function escapeHtml2 (str) {
  if (typeof str !== 'string') {
    return str
  }
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '`': '&#x60;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2f;',
  }
  str = str.replace(/[&<>`"'\/]/g, function(char) {
   return escapeMap[char]
  })
  return str
}