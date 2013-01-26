﻿using WickedSick.Server.XamlParser.Elements.Controls.Primitives;
using WickedSick.Server.XamlParser.Elements.Types;

namespace WickedSick.Server.XamlParser.Elements.Controls
{
    [Element(NullstoneNamespace = "Fayde.Controls")]
    public class Slider : RangeBase
    {
        public static readonly PropertyDescription OrientationProperty = PropertyDescription.Register("Orientation", typeof(Orientation), typeof(Slider));
    }
}