/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="ContentControl.js"/>

(function (namespace) {
    var ContentPresenter = Nullstone.Create("ContentPresenter", FrameworkElement);

    //#region Properties

    ContentPresenter.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, ContentPresenter);
    ContentPresenter.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return namespace.ControlTemplate; }, ContentPresenter);

    Nullstone.AutoProperties(ContentPresenter, [
        ContentPresenter.ContentProperty,
        ContentPresenter.ContentTemplateProperty
    ]);

    //#endregion

    //#region Properties

    // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
    ContentPresenter.Instance._CreateFallbackTemplate = function () {
        return new namespace.ControlTemplate(ContentPresenter, {
            Type: namespace.Grid,
            Children: [
                {
                    Type: namespace.TextBlock,
                    Props: {
                        Text: new BindingMarkup()
                    }
                }
            ]
        });
    };
    ContentPresenter.Instance._GetFallbackRoot = function () {
        /// <returns type="UIElement" />
        if (this._FallbackRoot == null) {
            if (!ContentPresenter._FallbackTemplate)
                ContentPresenter._FallbackTemplate = this._CreateFallbackTemplate();
            this._FallbackRoot = ContentPresenter._FallbackTemplate.GetVisualTree(this);
        }
        return this._FallbackRoot;
    };

    //#endregion

    //#region Instance Methods

    ContentPresenter.Instance._GetDefaultTemplateCallback = function () {
        /// <returns type="UIElement" />
        var templateOwner = Nullstone.As(this.TemplateOwner, namespace.ContentControl);
        if (templateOwner != null) {
            if (this.$ReadLocalValue(ContentPresenter.ContentProperty) instanceof UnsetValue) {
                this.$SetValue(ContentPresenter.ContentProperty,
                    new TemplateBindingExpression(namespace.ContentControl.ContentProperty, ContentPresenter.ContentProperty));
            }
            if (this.$ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof UnsetValue) {
                this.$SetValue(ContentPresenter.ContentTemplateProperty,
                    new TemplateBindingExpression(namespace.ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
            }
        }

        var template = Nullstone.As(this.ContentTemplate, DataTemplate);
        if (template != null) {
            this._ContentRoot = Nullstone.As(template.GetVisualTree(this), UIElement);
        } else {
            var content = this.Content;
            this._ContentRoot = Nullstone.As(content, UIElement);
            if (this._ContentRoot == null && content != null)
                this._ContentRoot = this._GetFallbackRoot();
        }
        return this._ContentRoot;
    };
    ContentPresenter.Instance._ClearRoot = function () {
        if (this._ContentRoot != null)
            this._ElementRemoved(this._ContentRoot);
        this._ContentRoot = null;
    };
    ContentPresenter.Instance.InvokeLoaded = function () {
        if (Nullstone.Is(this.Content, UIElement))
            this.$ClearValue(FrameworkElement.DataContextProperty);
        else
            this.DataContext = this.Content;
        this.InvokeLoaded$FrameworkElement();
    };

    ContentPresenter.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== ContentPresenter) {
            this._OnPropertyChanged$FrameworkElement(args, error);
            return;
        }
        if (args.Property._ID === ContentPresenter.ContentProperty._ID) {
            if ((args.NewValue && args.NewValue instanceof UIElement)
                || (args.OldValue && args.OldValue instanceof UIElement)) {
                this._ClearRoot();
            }
            if (args.NewValue && !(args.NewValue instanceof UIElement))
                this._SetValue(FrameworkElement.DataContextProperty, args.NewValue);
            else
                this._ClearValue(FrameworkElement.DataContextProperty);
            this._InvalidateMeasure();
        } else if (args.Property._ID === ContentPresenter.ContentTemplateProperty._ID) {
            this._ClearRoot();
            this._InvalidateMeasure();
        }
        this.PropertyChanged.Raise(this, args);
    };

    //#endregion

    //#region Annotations

    ContentPresenter.Annotations = {
        ContentProperty: ContentPresenter.ContentProperty
    };

    //#endregion

    namespace.ContentPresenter = Nullstone.FinishCreate(ContentPresenter);
})(Nullstone.Namespace("Fayde.Controls"));