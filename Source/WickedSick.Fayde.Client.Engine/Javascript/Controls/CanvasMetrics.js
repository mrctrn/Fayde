﻿/// <reference path="PanelMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Controls) {
        CanvasMetrics.prototype = new Controls.PanelMetrics();
        CanvasMetrics.prototype.constructor = CanvasMetrics;
        function CanvasMetrics() {
        }
        var superComputeBounds = CanvasMetrics.prototype.ComputeBounds;
        CanvasMetrics.prototype.ComputeBounds = function (fe, absoluteXform) {
            var surface = App.Instance.MainSurface;
            if (surface && fe._IsAttached && surface._IsTopLevel(fe)) {
                // a toplevel (non-popup) canvas doesn't subscribe to the same bounds computation as others
                rect.set(this.Extents, 0, 0, surface.ActualWidth, surface.ActualHeight);
                rect.copyTo(this.ExtentsWithChildren, this.Extents);
                rect.copyTo(this.Bounds, this.Extents);
                rect.copyTo(this.BoundsWithChildren, this.Bounds);

                this.ComputeGlobalBounds();
                this.ComputeSurfaceBounds();
            } else {
                superComputeBounds.call(this, fe, absoluteXform);
            }
        };;
        var superShiftPosition = CanvasMetrics.prototype.ShiftPosition;
        CanvasMetrics.prototype.ShiftPosition = function (uie, point) {
            var surface = App.Instance.MainSurface;
            if (surface && uie._IsAttached && surface._IsTopLevel(uie)) {
                this.ComputeBounds();
            } else {
                superShiftPosition.call(this, uie, point);
            }
        };
        Controls.CanvasMetrics = CanvasMetrics;
    })(Fayde.Controls || (Fayde.Controls = {}));
})(Fayde || (Fayde = {}));