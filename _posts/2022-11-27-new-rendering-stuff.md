---
layout: post
title:  "Some new CG and Rendering Cool Stuff!"
date:   2022-11-27 01:37:00 +0800
categories: rambling
author: FlifeX
---

### First of all

Some of you may remember the doomed article in my last Blog Apocalypse. Now I am bringing it back to you.

### Introduction to Rendering and CG. To another level.

First, a quick review of our last discussion.

I implemented something in Python to visualize how incident angle affects the shade and brightness of the point of incidence. However, y'all may think that a very basic and trivial thing because all I used was just scalar product.

Whatever, just wipe this off. We are going to embrace something really beautiful and stunning soon.

### Lambertian reflectance

This is exactly what we talked about last time. Just, I didn't tell you the official fancy name.
Since we are not going to talk about color for now, here is even a more simplified formula for you:  

$$
I_D = \boldsymbol{L} \cdot \boldsymbol{N} I_L
$$

in which $I_D$ is surface brightness (intensity of reflected light), $\boldsymbol{L}$ and $\boldsymbol{N}$ are *normalized* light vector and normal vector.

> Lambertian reflectance was firstly discussed in the 1760 book, *Photometria*.

I believe this is enough for our review. Let's get down to the real work!

### Phong model

From this section on, we are gonna talk about much more advanced stuff! Please prepare yourself if you are not very familiar with some of the problems.

Alright. The model, which is much more advanced than our basic idea, was a great work by Bui Tuong Phong. It is a pity that he passed away only at the age of 33, after publishing his PhD thesis about this model.

Some important stuff is coming! Listen very carefully, please.

1. local illumination

   What is this "local" here? Well, it just stands for "don't take complicated reflections into account", for now. A precise explanation? Things are *only* illuminated *directly* by light sources.

   Another term is global illumination, in which we need to take care of every single beams of light and their bouncing and multiple reflecting. 

   For what we are talking about here, we only care about local illumination.

2. specular, diffuse and ambient

   Imagine your mug (probably on your table now, huh?) and think about its highlight and other parts. You'd see some strong and small light spots, in comparison to other parts of your mug. Here we say, the highlight you imagined is "specular reflection" and other part is "diffuse reflection".

   And don't ever forget the environment where you put your mug. Without a bright background (just like a table) your mug will be darker under light source. We call this factor "ambient reflection".

   In Phong model, for every single material, 3 different attributes (*specular, diffuse and ambient reflection constants*) are defined, along with another thing called *shininess*, which controls how "shiny" the material is. Just imagine again, this time put a polished sliver sphere and velvet both in your mind. Compare them: the sphere has larger shininess and the velvet has a relatively small one.

3. viewer

   As we all know, what you see in reality will change in appearance if you move around. The same for CG and rendering.

   Imagine you are a vector, and you point to where you see. In this case, I make you an abstract "viewer vector" which defines what you'll see! For example, if you stand parallel to the light source, you will see the object's gradient in its brightness. However, if your sight is blocked by the object, you will simply see a black object!

Have them be perfectly understood in your mind! They are just so important for our next step.

To simplify, let's assume there's only one light source here:  

$$
I=k_\mathrm{a}i_\mathrm{a}+k_\mathrm{d}i_\mathrm{d}\cdot\boldsymbol{L}\cdot\boldsymbol{N}+k_\mathrm{s}i_\mathrm{s}\cdot(\boldsymbol{R}\cdot\boldsymbol{V})^\alpha
$$

and this is the Phong model.

In the formula, we still need to talk about some symbols. $I$ is the illumination of target point, $i_{\mathrm{a}, \mathrm{d}, \mathrm{s}}$ are respectively ambient light, diffuse part and specular part of the light source.

What are vectors $\boldsymbol{L}, \boldsymbol{N}, \boldsymbol{R}$ and $\boldsymbol{V}$? Well, keep in your mind that they are all normalized and have a start at point of incidence. $\boldsymbol{L}$ represents light vector, $\boldsymbol{N}$ is normal vector, $\boldsymbol{R}$ is reflected vector of $\boldsymbol{L}$ and $\boldsymbol{V}$ is *viewer* vector. Finally, $\alpha$ is the shininess of material.

Then you may doubt, *what if there are two or more lights in the scene?* Don't worry haha. Below is a breakdown of the formula, and you will understand it soon.

*Explanation starts*

The first term, $k_\mathrm{a}i_\mathrm{a}$, stays the same in a certain environment. You know right? Ambient light (in this case) has nothing to do with our lights, no matter how many there are.

For the second and third term, let's see them as a whole thing now, because they combined varies with properties of light source. The second term alone is the diffusive part of the desired result (*It is basically Lambertian reflectance for computing the material's diffuse lighting*!), while the third is the specular part. The third part is a bit different, but you surely have experienced specular reflections in your life. Think about it - when you see the reflection directly aligned, the glare may make your eyes watery. However, just a little change in direction makes sharp decline in the intensity your eye takes! This is why we are computing scalar product of reflection and viewer vectors.

So, why the exponent $\alpha$? Remember it is in proportion to how smooth our object is. the smoother it is, the intenser the specular reflection will be.

Oh, and your question for sure. If there are multiple light sources in the scene, just combine every of their "second and third terms" in Phong formula. Pretty easy huh?!

And if we consider this, Phone model may be written as follows:  

$$
I=k_\mathrm{a}i_\mathrm{a}+\sum_{l \in \mathrm{\{lights\}}} \left(k_\mathrm{d}i_{l,\mathrm{d}}\cdot\boldsymbol{L}_l\cdot\boldsymbol{N}_l+k_\mathrm{s}i_{l,\mathrm{s}}\cdot(\boldsymbol{R}_l\cdot\boldsymbol{V}_l)^\alpha\right)
$$

But don't forget though: Phong model is *empirical*, which means I cannot to provide an explanation for this in theory. 

#### Phong model explorations

In this section we are gonna talk about some usages and applications of the model. Please note that the model is not really physics-based, and should not be used for photorealistic rendering purposes. 

To start with, man, I am providing some pseudo code here. Check 'em and adapt to your own needs! Also, to help you, I'd provide some actual code in the future attached to the blog post.  

```
void PhongModelRendering() {
	vec3 normalizedLight = (a, b, c);
	vec3 normalIncidence = (e, f, g);
	vec3 reflected = normalizedLight.flip(normalIncidence);
	vec3 viewer = (x, y, z);

	for (p = camera[xcoord][ycoord]) {
		pIllumination = ambient + diffusion + specular;
	}
}
```

Whatever, after you manage to run the code successfully, you can work with some of properties and mess around with them.

Here, I'd like to introduce colors as B&W is not enough for ambitious dudes like us.

**Colors**

In application, it is often recommended to separate R, G and B channels and treat 3 primary channels individually with Phong model (because a material usually has different constants for different wavelengths of light.)

When messing with RGBA (or just RGB) things, the main principle is pretty much the same as what we'd talked about just now. Just make sure to combine 3 channels and you'll get a picture and cure the computer's colorblind.

**Blinn-Phong model**

In some cases, Phong model may produce some faulty results (mainly specular reflection). To solve such problem, James F. Blinn modified Phong model, making what we call "Blinn-Phong model" today.

The model ditchs the vector $\boldsymbol{R}$ we talked about. Instead, it introduces a new vector, *halfway vector* $\boldsymbol{H}$. Basically, they are just 2 different ways to calculate the specular reflection.

Just like the normal vector is the angular bisector of  $\boldsymbol{L}$ and  $\boldsymbol{R}$, $\boldsymbol{H}$ is the angular bisector of  $\boldsymbol{L}$ and  $\boldsymbol{V}$. This makes a difference, because when we are using default Phong model, there will be cases where the angle between $\boldsymbol{V}$ and $\boldsymbol{R}$ is larger than 90 degrees. Since it utilizes scalar product, this will result in a negative value! We certainly don't want it sometimes.

In Blinn-Phong model, however, things are different: we are gonna do with $\theta = \left\langle\boldsymbol{H},\boldsymbol{N}\right\rangle$. In this case, if we see from the direction of $\boldsymbol{R}$, $\theta$ will be 0 degree and we will see strongest specular reflection now.

However, the result of Blinn-Phong and Phong models are slightly different, but I would say Blinn made some improvements to the result, because it looks more realistic!

### Conclusion 

*"What's it going to be then, eh?"*

Well, O my brother, this was just a *skorry* description to some of those rendering lighting model stuff. I'd consider this bit *starry* and rare pleasure. Always a nice time, just try to make all of these things clear and nicely done. And all that cal.

-- FlifeX

