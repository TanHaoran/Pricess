This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

安装ionic
sudo cnpm install -g cordova ionic 

安装依赖
npm install 或 cnpm install

#
调试
ionic serve

添加打包平台
ionic cordova build android --prod
cordova platform add android 
cordova platform add ios 

编译
ionic build android --prod
ionic build ios

压缩
 npm run minify

但是–consolelogs参数不能单独使用，需配合–livereload参数使用，即：
在虚拟机上调试
$ ionic run/emulate android/ios --livereload --consolelogs

或者使用简写版本：

$ ionic run/emulate android/ios -l -c


新建组件
ionic g page myPage

√ Create app/pages/my-page/my-page.html
√ Create app/pages/my-page/my-page.ts
√ Create app/pages/my-page/my-page.scss
#

生成图标，启动页
 ionic resources --icon
 ionic resources --splash
