﻿
namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class Canvas : Panel
    {
        public static readonly AttachedPropertyDescription ZIndexProperty = AttachedPropertyDescription.Register("ZIndex", typeof(int), typeof(Canvas));
    }
}