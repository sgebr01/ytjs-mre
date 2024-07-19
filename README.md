
# YT.js - MRE

Minimal Reproducible Example of network issue in YouTube.js for issue #690 on LuanRT/YouTube.js. Uses Expo and React Native and will require you to install a development APK to your phone for you to run the app. That is available at 

   https://drive.google.com/file/d/1yBQ5MdLuyqMG-0VCueRHeJFkWbM0UWio/view?usp=drive_link

Download and Install this to your phone (steps will differ slightly based on phone). The phone may warn you about it being potentially harmful, this is just since it's an APK from online.

All of the code that interacts with YouTube.js lives in the App.tsx file (which is just typescript). The platform shims that make it work are in Innertube.tsx and the actual library is in youtubei.js.
## Get Started


Clone this Repo (to your computer)

```bash
  git clone https://github.com/sgebr01/ytjs-mre
```

Install Packages with NPM

```bash
  npm install
```

Then, update the package.json for the library `jintr` in node_modules. Add the field `"main": "./dist/index.d.ts` to `node_modules/jintr/package.json`


Start the server with npm start

```bash
   npm start
```


Then to connect the development APK on your phone to the computer you will need to scan the QR Code that appears in your terminal with your phone's camera app.

From there, it should connect and you can edit any files you'd like and it will instantly reload. All of the app logic is located in `app.tsx`, and the API interaction with youtubei.js is in the `load()` function within it.

The youtube.js library is in the youtubei.js folder (not in node_modules) since I had to update some shims to make it work with react native


If you have any questions or any issues arise setting this up, feel free to contact me through sggebr1@gmail.com or through the original issue
