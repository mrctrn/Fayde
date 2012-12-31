/// <reference path="Panel.js" />
/// CODE

//#region StackPanel
var StackPanel = Nullstone.Create("StackPanel", Panel);

//#region Properties

StackPanel._OrientationChanged = function (d, args) {
    var sp = Nullstone.As(d, StackPanel);
    if (!sp)
        return;
    d._InvalidateMeasure();
    d._InvalidateArrange();
    d._UpdateHtmlOrientation(args.NewValue);
};
StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Orientation); }, StackPanel, Orientation.Vertical, StackPanel._OrientationChanged);

Nullstone.AutoProperties(StackPanel, [
    StackPanel.OrientationProperty
]);

//#endregion

StackPanel.Instance.MeasureOverride = function (constraint) {
    //Info("StackPanel.MeasureOverride [" + this._TypeName + "]");
    var childAvailable = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    var measured = new Size(0, 0);

    var orientation = this.Orientation;
    if (orientation === Orientation.Vertical) {
        childAvailable.Width = constraint.Width;
        var width = this.Width;
        if (!isNaN(width))
            childAvailable.Width = width;
        childAvailable.Width = Math.min(childAvailable.Width, this.MaxWidth);
        childAvailable.Width = Math.max(childAvailable.Width, this.MinWidth);
    } else {
        childAvailable.Height = constraint.Height;
        var height = this.Height;
        if (!isNaN(height))
            childAvailable.Height = height;
        childAvailable.Height = Math.min(childAvailable.Height, this.MaxHeight);
        childAvailable.Height = Math.max(childAvailable.Height, this.MinHeight);
    }

    var children = this.Children;
    for (var i = 0; i < children.GetCount(); i++) {
        var child = children.GetValueAt(i);
        child.Measure(childAvailable);
        var size = child._DesiredSize;

        if (orientation === Orientation.Vertical) {
            measured.Height += size.Height;
            measured.Width = Math.max(measured.Width, size.Width);
        } else {
            measured.Width += size.Width;
            measured.Height = Math.max(measured.Height, size.Height);
        }
    }

    return measured;
};
StackPanel.Instance.ArrangeOverride = function (arrangeSize) {
    //Info("StackPanel.ArrangeOverride [" + this._TypeName + "]");
    var arranged = arrangeSize;
    var orientation = this.Orientation;

    if (orientation === Orientation.Vertical)
        arranged.Height = 0;
    else
        arranged.Width = 0;

    var children = this.Children;
    for (var i = 0; i < children.GetCount(); i++) {
        var child = children.GetValueAt(i);
        var size = child._DesiredSize;
        var childFinal;
        if (orientation === Orientation.Vertical) {
            size.Width = arrangeSize.Width;

            childFinal = new Rect(0, arranged.Height, size.Width, size.Height);

            if (childFinal.IsEmpty())
                child.Arrange(new Rect());
            else
                child.Arrange(childFinal);

            arranged.Width = Math.max(arranged.Width, size.Width);
            arranged.Height += size.Height;
        } else {
            size.Height = arrangeSize.Height;

            childFinal = new Rect(arranged.Width, 0, size.Width, size.Height);
            if (childFinal.IsEmpty())
                child.Arrange(new Rect());
            else
                child.Arrange(childFinal);

            arranged.Width += size.Width;
            arranged.Height = Math.max(arranged.Height, size.Height);
        }
    }

    if (orientation === Orientation.Vertical)
        arranged.Height = Math.max(arranged.Height, arrangeSize.Height);
    else
        arranged.Width = Math.max(arranged.Width, arrangeSize.Width);

    return arranged;

};

//#region Html Translations

StackPanel.Instance.CreateHtmlObjectImpl = function () {
    var rootEl = this.CreateHtmlObjectImpl$Panel();
    rootEl.firstChild.style.fontSize = "0px";
    return rootEl;
};
StackPanel.Instance.InsertHtmlChild = function (child, index) {
    var content = this.GetContentHtmlElement();
    var children = this.Children;
    var nextEl;
    if ((index + 1) < children.GetCount())
        nextEl = children.GetValueAt(index + 1).GetRootHtmlElement();

    var wrapper = document.createElement("div");
    wrapper.style.display = "inline-block";
    wrapper.style.position = "relative";
    if (this.Orientation === Orientation.Horizontal) {
        wrapper.style.height = "100%";
        wrapper.style.width = "auto";
    }
    else {
        wrapper.style.width = "100%";
        wrapper.style.height = "auto";
    }
    wrapper.appendChild(child.GetRootHtmlElement());
    if (nextEl) {
        content.insertBefore(wrapper, nextEl);
    }
    else
        content.appendChild(wrapper);
};
StackPanel.Instance.RemoveHtmlChild = function (child, index) {
    var rootEl = child.GetRootHtmlElement();
    rootEl.parentNode.parentNode.removeChild(rootEl.parentNode);
};

StackPanel.Instance._UpdateHtmlOrientation = function (orientation) {
    this.InvalidateIsFixedWidth();
    this.InvalidateIsFixedHeight();
    var children = this.Children;
    var len = children.GetCount();
    var child;
    for (var i = 0; i < len; i++) {
        child = children.GetValueAt(i);
        var wrapper = child.GetRootHtmlElement().parentNode;
        if (orientation === Orientation.Horizontal) {
            wrapper.style.height = "100%";
            wrapper.style.width = "auto";
        }
        else {
            wrapper.style.width = "100%";
            wrapper.style.height = "auto";
        }
    }
};

StackPanel.Instance.CalculateIsFixedWidth = function () {
    //TODO: do a real calculation based on this.Orientation
    return false;
};
StackPanel.Instance.CalculateIsFixedHeight = function () {
    //TODO: do a real calculation based on this.Orientation
    return false;
};

//#endregion

Nullstone.FinishCreate(StackPanel);
//#endregion