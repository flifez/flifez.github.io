---
layout: post
title:  "OpenCore Hackintosh Debugging Log"
date:   2022-09-09 16:22:00 +0800
categories: rambling
---

{% include construction_template.html date="9/9" progress="~60" desc="I don't guarantee info below is latest. Will check 'em when this is finished." %}


Last month (Aug. 2022), I installed macOS Monterey 12.5.1 (the latest version at the time) on an H-110 system I once used to install macOS High Sierra 10.13.6 using 🍀. That installation was perfect but I deleted it by mistake.

This time, I did following things:

- [x] Successfully install and run;
- [x] Patch network, ~~audio I/O~~ audio out, USB mapping;
- [x] Patch my GTX 1050 Ti GPU at least to run;
- [ ] Patch Metal for the GPU (WebDriver before Mojave)

My PC does not have a microphone and a webcam so they are not listed.

### First things first...

As this is the first time I have looked into Hackintosh stuff since 2019, I did not know the mainstream method of installing Hackintosh now. So without checking help documents, I downloaded a macOS 12.5.1 image and this took me about 3 hours. However, it turned out that I'm just working for *nothing* -- now they recommend using `BaseSystem.dmg` or something like that (i.e. macOS Recovery) to do a fresh install.

Also, this process was fully automatic. Just use an one-line command provided by OpenCore, it downloaded the image I need to use and then, the show began.

### USB and main configuration

Another evident change is that I need to do *USB mapping* before starting other processes, otherwise one will (probably) get a *boot loop*. 

This takes **quite some works** to finish this so called USB mapping, for I need to plug different types of USB devices (USB 1.1, 2.0, 3.0 and other strange versions) into every port. Luckily I don't have USB-C ports on my PC, or I need to plug both front and back.

Anyway I finished it. This little cutie gave me some settings looking like a bunch of Martian language, but let's just put them aside for now.

**Here I'd like to remind you**: the reason why Hackintosh is so diffucult *often* contains two parts: first, driver installations; and second, the thing we're going to do soon -- `config.plist` configuration. 

I am just telling a story, and in case you want to install one by yourself, **please find OpenCore official documents**. `config.plist` varies with computer hardwares. If you want to find an off-the-shelf copy, it is almost impossible to do so. Also, Hackintosh has strict requirements for some specific hardware of the computer, and although some `.kext`s can bypass, the stability of your system may be greatly reduced, so please think twice.

> Actually, kexts are already deprecated, according to Apple itself: from a certain version of macOS on, kexts are already abandoned by default and you need to enable them manually to use "kernel extensions" (viz. kext).

Let's get down to the meat. I really suggest anyone who has to edit plist files to use editors with GUI, unless you want to look up and modify keypairs one by one. Also it saves your time a lot.

In the OpenCore pack I previously downloaded from GitHub, there was a template `config.plist` where I was able to modify/add keypairs according to its tutorial and my own needs.

This was even more lengthy and drawn out than USB mapping (I spent about 30 minutes to finish it), but in the end, you'll mostly get a config that doesn't need much more tweaking (in this case, macOS will probably boot minimally i.e., not drive anything other than basic I/O devices, and it needs further settings later).

### Booting into the unknown

Now my little flash drive is thirsty for some real work. Reboot, and I chose *UEFI method* in BIOS settings ans set to boot from USB device.

*If nothing went wrong*, macOS Recovery will now show up. Do not immerse in excitement yet: all things we have done are just the first step into Hackintosh's gate. 

Next we need to perform some operations about the *disk*. As usual, a reminder is that **data is priceless** and anyone should be especially careful with anything related to disks.

I formatted a partition to APFS (**DON'T** choose Case-Sensitive unless you know what you are doing) as the System Disk (*Macintosh HD*) for the installation later.

The next process is rather straightforward. Just install.

Remainder: best to install macOS on an SSD. You won't like it when it gets frozen from time to time... I learned that lesson firsthand.

### Post-installation Settings

After seeing a bunch of chilling chunk of code rolling across the screen (if only you enabled `-v` argument in launch parameters) I finally saw the Apple logo shining on my PC's screen. This was certainly a milestone victory, but before celebrating, the following has to be done.

If you are using macOS-compatible mouse and keyboard, there is nothing to do with them. (For me, I use Logitech G502 and MX Master 2S mice and they both support macOS very well. Also, my Keychorn Q1 mechanical keyboard does satisfying work in this.) 

However, if you are using a laptop, the trackpad and built-in keyboard may fail your expectation. In this case, look through your `config.plist` again -- no worries since you don't need to install again. Install some kexts, modify `config.plist` and see what happens: after all, this is the heart of Hackintosh -- drilling down.

Second you don't want to miss is sound and network cards. In most cases, those cards are built-in, mostly manufactured by Realtek and there is corresponding kext for that. However, if you are an avid fan of audio, a mixer or music producer, or you have special needs for networking (like soft routing), you will have discrete cards, which means you have to look through some articles and find your own solutions suiting your needs best.

Third, it's time for camera and microphone. I don't have them so this section is left for you to fill in. :)

### Drivers, drivers and drivers

Drivers (in macOS just kexts) drive your hardwares so that they can be droven by you. Actually we have installed many drivers in previous installation progress, so in this section I'm gonna talk about WebDriver patching for Pascal GPUs (just Pascals -- Turings and Voltas can get back a lil bit).

Here I used a tool named "OpenCore Legacy Patcher". Surprisingly, this tool was initially intended for old Macs to bypass Apple's restriction to install never versions of macOS. 
