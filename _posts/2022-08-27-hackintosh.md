---
layout: post
title:  "OpenCore Hackintosh Debugging Log"
date:   2022-09-09 16:22:00 +0800
categories: rambling
---

<p>
<center>
<strong>This page has been under construction since <em>9/9</em>.</strong>
</center>
<center>
Currently progress: <strong>~15%</strong>
<br>
<em>I don't guarantee info below are latest. Will check them when this is finished.</em>
</center>
</p>


---

Last month (Aug. 2022), I installed macOS Monterey 12.5.1 (the latest version at the time) on an H-110 system I once used to install macOS High Sierra 10.13.6 using 🍀. That installation was perfect but I deleted it by mistake.

This time, I did the following things:

- [x] Successfully install and run;
- [x] Patch network, ~~audio I/O~~ audio out, USB mapping;
- [x] Patch my GTX 1050 Ti GPU at least to run;
- [ ] Patch Metal for the GPU (WebDriver before Mojave)

My PC does not have a microphone and a webcam so they are not listed.

### First things first...

As this is the first time I have looked into Hackintosh things since 2019, I did not know the mainstream method of installing Hackintosh now. So without checking documents, I downloaded a macOS 12.5.1 image and this took me about 3 hours. However, it turned out that I'm just working for *nothing* -- today they recommend using `BaseSystem.dmg` or something like that (i.e. macOS Recovery) to do a fresh install.

Also, this process was fully automatic. Just use an one-line command provided by OpenCore, it will download the image you'll need to use and then, the show begins.

### USB and main configuration

Another evident change is that you need to do *USB mapping* before starting other processes, otherwise you will (probably) get a *boot loop*^1^. 

> This takes **quite some works** to finish this so called USB mapping, for I need to plug different types of USB devices (USB 1.1, 2.0, 3.0 and other strange versions) into every port. Luckily I don't have USB-C ports on my PC, or I need to plug both front and back.

Anyway you will probably finish it. 
