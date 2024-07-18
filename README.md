
# YT.js - MRE

Minimal Reproducible Example of network issue in YouTube.js for issue #690 on LuanRT/YouTube.js. Uses Expo and React Native and will require you to install a development APK to your phone for you to run the app. That is available at 

   https://drive.google.com/file/d/1yBQ5MdLuyqMG-0VCueRHeJFkWbM0UWio/view?usp=drive_link

Download and Install this (will differ based on phone). The phone may warn you about it being potentially harmful, this is just since it's an APK from online.

All of the code that interacts with YouTube.js lives in the App.tsx file (which is just typescript). The platform shims that make it work are in Innertube.tsx and the actual library is in youtubei.js.
## Get Started


Clone this Repo

```bash
  git clone https://github.com/sgebr01/ytjs-mre
```

Install Packages with NPM

```bash
  npm install
```

Then start the server with npm start

```bash
   npm start
```

Then you need to update the package.json for the library `jintr` in node_modules. Add the field `"main": "./dist/index.d.ts` 

Then to connect the development APK on your phone to the computer you will need to scan the QR Code that appears with your phone's camera app.

From there, it should connect and you can edit any files you'd like and it will instantly reload. All of the app logic is located in `app.tsx`, and the actual API interaction with the youtubei.js library is in the `load()` function that is located there. The react native shims are in the Innertube function.

The youtubei.js library is in the youtubei.js folder (I had to update some shims to make it work with react native)


If you have any questions or any issues arise setting this up, feel free to also contact me through sggebr1@gmail.com or through the original issue
