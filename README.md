# imtweakpane

[Tweakpane](https://cocopon.github.io/tweakpane/) but with immediate-y interface (actually not)

Rough, experimental, made for myself

```html
<script src="https://unpkg.com/tweakpane@3.0.5/dist/tweakpane.js"></script>
<script src="https://unpkg.com/@0b5vr/imtweakpane@0.1.0/dist/imtweakpane.js"></script>

<script>
  const gui = new IMTWEAKPANE.ImPane();

  const update = () => {
    requestAnimationFrame( update );

    const folder = gui.folder( 'folder' );
    const value = folder.value( 'value', 1.0, { min: 0.0, max: 1.0 } );
  };
  update();
</script>
```
