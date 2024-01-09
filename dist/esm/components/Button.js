import React from 'react';
export const Button = (props) => {
    const { children, backgroundColor, color, style } = props;
    const _style = style || {};
    if (backgroundColor)
        _style.backgroundColor = backgroundColor;
    if (color)
        _style.color = color;
    return (React.createElement("button", Object.assign({ style: _style }, props), children));
};
//# sourceMappingURL=Button.js.map