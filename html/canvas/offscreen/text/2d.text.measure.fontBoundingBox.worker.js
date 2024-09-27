// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.measure.fontBoundingBox
// Description:Testing fontBoundingBox measurements
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

promise_test(async t => {
  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d');

  var f = new FontFace("CanvasTest", "url('/fonts/CanvasTest.ttf')");
  f.load();
  self.fonts.add(f);
  await self.fonts.ready;
  ctx.font = '40px CanvasTest';
  ctx.direction = 'ltr';
  ctx.align = 'left'
  _assertSame(ctx.measureText('A').fontBoundingBoxAscent, 30, "ctx.measureText('A').fontBoundingBoxAscent", "30");
  _assertSame(ctx.measureText('A').fontBoundingBoxDescent, 10, "ctx.measureText('A').fontBoundingBoxDescent", "10");

  _assertSame(ctx.measureText('ABCD').fontBoundingBoxAscent, 30, "ctx.measureText('ABCD').fontBoundingBoxAscent", "30");
  _assertSame(ctx.measureText('ABCD').fontBoundingBoxDescent, 10, "ctx.measureText('ABCD').fontBoundingBoxDescent", "10");
}, "Testing fontBoundingBox measurements");
done();
