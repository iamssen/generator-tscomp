# Yeoman Generator for Web Component

```sh
npm install -g generator-tscomp
mkdir your-project
cd your-project
yo tscomp
```

# Update log

## 2016.2.2
- Using typescript 1.8 AMD, System.js `outFile`
- Changed typescript compile `gulp-tsc` to `typescript@1.8.*`
- Now `npm run build` will make 3 type module files (AMD, System.js, Common.js)

## 2016.1.25
- Change module dialog

## 2015.12.31
- Component available with unpkg. (and fix undefined `exports` bug on browser)

## 2015.12.31
- Remove `use strict`

## 2015.12.21
- Exclude ignore `/dist`
- Separated `modules.json`

## 2015.12.20
- First release