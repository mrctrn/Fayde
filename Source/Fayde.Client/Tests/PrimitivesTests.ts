/// <reference path="qunit-1.10.0.d.ts" />

QUnit.module("Primitives Tests");

test("size", () => {
    var s = size.fromRaw(125, 250);
    strictEqual(s.Width, 125, "FromRaw should properly set width.");
    strictEqual(s.Height, 250, "FromRaw should properly set height.");

    ok(!size.isEqual(size.fromRaw(0, 0), size.fromRaw(0, 120)), "Sizes should not be equal.");
    ok(!size.isEqual(size.fromRaw(0, 0), size.fromRaw(120, 0)), "Sizes should not be equal.");
    ok(!size.isEqual(size.fromRaw(0, 0), size.fromRaw(120, 120)), "Sizes should not be equal.");
    ok(size.isEqual(size.fromRaw(120, 120), size.fromRaw(120, 120)), "Sizes should be equal.");

    var s2 = s.Clone();
    notStrictEqual(s2, s, "Cloned object should be the same reference.");
    strictEqual(s2.Width, s.Width, "Cloned width should match.");
    strictEqual(s2.Height, s.Height, "Cloned height should match.");
    ok(size.isEqual(s, s2), "Cloned object isEqual should be true.");
   
    s = size.createInfinite();
    ok(size.isEqual(s, size.fromRaw(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)), "createInfinite size should be Infinity,Infinity.");
    
    s = size.createNegativeInfinite();
    ok(size.isEqual(s, size.fromRaw(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)), "createNegativeInfinite size should be -Infinity,-Infinity.");

    size.clear(s);
    ok(size.isEqual(s, size.fromRaw(0, 0)), "Size should be 0,0 after clear.");

    s = size.growBy(s, 10, 20);
    ok(size.isEqual(s, size.fromRaw(10, 20)), "Size should be 10,20 after growBy.");
    
    s = size.growByThickness(s, new Thickness(5, 10, 5, 10));
    ok(size.isEqual(s, size.fromRaw(20, 40)), "Size should be 20,40 after growByThickness.");
    
    s = size.shrinkByThickness(s, new Thickness(5, 10, 5, 10));
    ok(size.isEqual(s, size.fromRaw(10, 20)), "Size should be 10,20 after shrinkByThickness.");

    s = size.shrinkBy(s, 10, 20);
    ok(size.isEqual(s, size.fromRaw(0, 0)), "Size should be 0,0 after shrinkBy.");

    var s3 = size.fromRaw(125, 250);
    var s4 = size.fromRaw(300, 100);
    size.min(s3, s4);
    ok(s3.Width === 125 && s3.Height === 100, "Min of 125,250 & 300,100 should be 125,100.");
    
    s3 = size.fromRaw(125, 250);
    s4 = size.fromRaw(300, 100);
    size.max(s3, s4);
    ok(s3.Width === 300 && s3.Height === 250, "Max of 125,250 & 300,100 should be 300,250.");
});

test("rect", () => {
    var r = rect.fromSize(size.fromRaw(50, 100));
    strictEqual(r.X, 0, "FromSize should properly set x.");
    strictEqual(r.Y, 0, "FromSize should properly set y.");
    strictEqual(r.Width, 50, "FromSize should properly set width.");
    strictEqual(r.Height, 100, "FromSize should properly set height.");
    
    var r1 = new rect();
    var r2 = new rect();
    rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 0, 0, 1);
    ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
    rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 0, 1, 0);
    ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
    rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 1, 0, 0);
    ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
    rect.set(r1, 0, 0, 0, 0); rect.set(r2, 1, 0, 0, 0);
    ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
    rect.set(r1, 1, 1, 1, 1); rect.set(r2, 1, 1, 1, 1);
    ok(rect.isEqual(r1, r2), "Rects should be equal.");

    rect.clear(r1);
    strictEqual(r1.X, 0, "X should be 0 when cleared.");
    strictEqual(r1.Y, 0, "Y should be 0 when cleared.");
    strictEqual(r1.Width, 0, "Width should be 0 when cleared.");
    strictEqual(r1.Height, 0, "Height should be 0 when cleared.");

    r1.X = 5;
    r1.Y = 5;
    rect.growBy(r1, 5, 5, 5, 5);
    rect.set(r2, 0, 0, 10, 10);
    ok(rect.isEqual(r1, r2), "Rect should grow by 10,10.");
    
    rect.growByThickness(r1, new Thickness(5, 5, 5, 5));
    rect.set(r2, -5, -5, 20, 20);
    ok(rect.isEqual(r1, r2), "Rect should grow by 10,10.");

    rect.shrinkByThickness(r1, new Thickness(5, 5, 5, 5));
    rect.set(r2, 0, 0, 10, 10);
    ok(rect.isEqual(r1, r2), "Rect should shrink by 10,10.");

    rect.shrinkBy(r1, 5, 5, 5, 5);
    rect.set(r2, 5, 5, 0, 0);
    ok(rect.isEqual(r1, r2), "Rect should shrink by 10,10.");

    rect.set(r1, 75, 75, 25, 25);
    rect.set(r2, 50, 50, 50, 50);
    rect.extendTo(r1, 50, 50);
    ok(rect.isEqual(r1, r2), "Rect should now include 50,50 increasing total size to 50,50.");

    rect.set(r1, 50, 50, 25, 25);
    rect.set(r2, 50, 50, 50, 50);
    rect.extendTo(r1, 100, 100);
    ok(rect.isEqual(r1, r2), "Rect should now include 100,100 increasing total size to 50,50.");
    
    rect.set(r1, 50, 50, 50, 50);
    rect.set(r2, 50, 50, 50, 50);
    rect.extendTo(r1, 75, 75);
    ok(rect.isEqual(r1, r2), "Rect should now be unchanged including 75,75.");

    var r3 = new rect();
    
    rect.set(r3, 50, 50, 25, 25);
    rect.set(r1, 25, 25, 50, 50);
    rect.set(r2, 50, 50, 50, 50);
    rect.intersection(r1, r2);
    ok(rect.isEqual(r1, r3), "Intersection of 25,25,50,50 and 50,50,50,50 should be 50,50,25,25");
    
    rect.set(r3, 25, 25, 75, 75);
    rect.set(r1, 25, 25, 50, 50);
    rect.set(r2, 50, 50, 50, 50);
    rect.union(r1, r2);
    ok(rect.isEqual(r1, r3), "Union of 25,25,50,50 and 50,50,50,50 should be 25,25,75,75");
});