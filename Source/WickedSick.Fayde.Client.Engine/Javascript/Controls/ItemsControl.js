/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// CODE
/// <reference path="Panel.js"/>
/// <reference path="ItemsPresenter.js"/>

var ItemCollection = {};//TODO: Implement

//#region ItemsControl
var ItemsControl = Nullstone.Create("ItemsControl", Control);

ItemsControl.GetItemsOwner = function (ele) {
    var panel = Nullstone.As(ele, Panel);
    if (panel == null || !panel.GetIsItemsHost())
        return null;
    var owner = Nullstone.As(panel.GetTemplateOwner(), ItemsPresenter);
    if (owner != null)
        return Nullstone.As(owner.GetTemplateOwner(), ItemsControl);
    return null;
};

//#region DEPENDENCY PROPERTIES

ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl);
ItemsControl.Instance.GetItems = function () {
    return this.GetValue(ItemsControl.ItemsProperty);
};
ItemsControl.Instance.SetItems = function (value) {
    this.SetValue(ItemsControl.ItemsProperty, value);
};

//#endregion

//#region ANNOTATIONS

ItemsControl.Annotations = {
    ContentProperty: ItemsControl.ItemsProperty
};

//#endregion

Nullstone.FinishCreate(ItemsControl);
//#endregion