# imtweakpane

[![Latest NPM release](https://img.shields.io/npm/v/@0b5vr/imtweakpane.svg)](https://www.npmjs.com/package/@0b5vr/imtweakpane)

[Tweakpane](https://cocopon.github.io/tweakpane/) but with immediate-y interface (actually not)

Rough, experimental, made for myself

```html
<script src="https://unpkg.com/tweakpane@3.0.5/dist/tweakpane.js"></script>
<script src="https://unpkg.com/@0b5vr/imtweakpane@0.1.1/dist/imtweakpane.js"></script>

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

- [Docs](https://0b5vr.github.io/imtweakpane/docs/)
