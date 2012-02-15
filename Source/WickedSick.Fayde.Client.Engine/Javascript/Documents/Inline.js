﻿/// <reference path="TextElement.js"/>
/// CODE

//#region Inline

function Inline() {
    TextElement.call(this);
    this._Autogen = false;
}
Inline.InheritFrom(TextElement);

Inline.prototype.Equals = function (inline) {
    /// <returns type="Boolean" />
    if (this.GetFontFamily() != inline.GetFontFamily())
        return false;
    if (this.GetFontSize() != inline.GetFontSize())
        return false;
    if (this.GetFontStyle() != inline.GetFontStyle())
        return false;
    if (this.GetFontWeight() != inline.GetFontWeight())
        return false;
    if (this.GetFontStretch() != inline.GetFontStretch())
        return false;
    if (this.GetTextDecorations() != inline.GetTextDecorations())
        return false;
    if (this.GetForeground() != inline.GetForeground()) //TODO: Equals?
        return false;
    return true;
};

Inline.prototype._GetAutogenerated = function () {
    /// <returns type="Boolean" />
    return this._Autogen;
};
Inline.prototype._SetAutogenerated = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._Autogen = value;
};

//#endregion