
function setStyle(style, options = {}) {
  const { element = document.body } = options;
  const oldStyle = {};

  const styleKeys = Object.keys(style);

  // IE browser compatible
  styleKeys.forEach(key => {
    oldStyle[key] = element.style[key];
  });

  styleKeys.forEach(key => {
    element.style[key] = style[key];
  });

  return oldStyle;
}

export default setStyle;
