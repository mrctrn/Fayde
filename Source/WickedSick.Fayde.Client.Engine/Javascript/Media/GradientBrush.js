/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region GradientBrush
var GradientBrush = Nullstone.Create("GradientBrush", Brush);

GradientBrush.Instance._GetMappingModeTransform = function (bounds) {
    /// <param name="bounds" type="Rect"></param>
    /// <returns type="Matrix" />
    if (this.GetMappingMode() === BrushMappingMode.Absolute)
        return new Matrix();
    return new ScalingMatrix(bounds.Width, bounds.Height);
};

//#region DEPENDENCY PROPERTIES

GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.Instance.GetGradientStops = function () {
    /// <returns type="GradientStopCollection" />
    return this.GetValue(GradientBrush.GradientStopsProperty);
};

GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () { return Number; }, GradientBrush, BrushMappingMode.RelativeToBoundingBox);
GradientBrush.Instance.GetMappingMode = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(GradientBrush.MappingModeProperty);
};
GradientBrush.Instance.SetMappingMode = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(GradientBrush.MappingModeProperty, value);
};

//#endregion

Nullstone.FinishCreate(GradientBrush);
//#endregion